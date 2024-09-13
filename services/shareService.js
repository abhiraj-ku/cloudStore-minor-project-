const UserData = require("../models/userDataModel");
const crypto = require("crypto");
const moment = require("moment");

// Create shareable link
exports.createShareableLink = async ({
  emailid,
  filekey,
  expirationTime,
  password,
}) => {
  const userFile = await UserData.findOne({ emailid, filekey });
  if (!userFile) throw new Error("File not found");

  const expiresAt = moment().add(expirationTime, "minutes").toDate();
  const token = crypto.randomBytes(16).toString("hex");

  userFile.shareableLink = token;
  userFile.linkExpiresAt = expiresAt;
  if (password) {
    userFile.password = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
  }

  await userFile.save();
  return { shareableLink: `http://cloudstore.com/files/${token}`, expiresAt };
};

// Access shared file
exports.accessSharedFile = async ({ token, password }) => {
  const userFile = await UserData.findOne({
    shareableLink: token,
    linkExpiresAt: { $gte: new Date() },
  });

  if (!userFile) throw new Error("Invalid or expired link");
  if (
    userFile.password &&
    crypto.createHash("sha256").update(password).digest("hex") !==
      userFile.password
  ) {
    throw new Error("Invalid password");
  }

  return { fileUrl: userFile.filelocation };
};
