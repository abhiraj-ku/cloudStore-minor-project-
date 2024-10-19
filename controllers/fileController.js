const UserData = require("../models/userDataModel");
const { uploadFileToS3, deleteFileFromS3 } = require("../utils/s3Utils");
const {
  createShareableLink,
  accessSharedFile,
} = require("../services/shareService");

exports.uploadUserData = async (req, res) => {
  const { emailid } = req.body;
  if (emailid) {
    try {
      const files = req.files; // array of uploaded files
      const filePromises = files.map((file) => {
        const filelocation = `http://d1b71o63lyfgz5.cloudfront.net/${file.key}`;
        const { key: filekey, originalname: filename } = file;
        const created = Date.now();

        const newUserData = new UserData({
          emailid,
          filelocation,
          filekey,
          filename,
          created,
        });
        return newUserData.save();
      });

      await Promise.all(filePromises);
      res.status(200).json({ result: "success" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error during data insertion", details: error });
    }
  } else {
    res
      .status(400)
      .json({ result: "error", message: "Please fill required details" });
  }
};

// For file preview
exports.previewFile = async (req, res) => {
  try {
    const user = await UserData.findOne({ filekey: req.query.key });
    if (user) {
      res.status(200).json({ fileUrl: user.filelocation });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching file preview", details: error });
  }
};
