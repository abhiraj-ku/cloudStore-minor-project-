const UserData = require("../models/loginSchema");
const { deleteFileFromS3 } = require("../utils/s3Utils");

exports.getUserData = async (req, res) => {
  const { emailid } = req.body;

  // Check if the requested emailid matches the authenticated user's email
  if (req.user.emailid !== emailid) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only access your own data" });
  }

  try {
    const user = await UserData.findOne({ emailid });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user data", details: error.message });
  }
};

exports.uploadUserData = async (req, res) => {
  const { emailid } = req.body;
  if (emailid) {
    try {
      const filelocation = `http://d1b71o63lyfgz5.cloudfront.net/${req.files[0].key}`;
      const { key: filekey, originalname: filename } = req.files[0];
      const created = Date.now();
      const newUserData = new UserData({
        emailid,
        filelocation,
        filekey,
        filename,
        created,
      });
      const result = await newUserData.save();
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

exports.deleteUserData = async (req, res) => {
  try {
    const params = {
      Bucket: "anuuserfiles",
      Key: req.query.key,
    };
    const s3Response = await deleteFileFromS3(params);
    if (s3Response) {
      const result = await UserData.deleteOne({ filekey: req.query.key });
      if (result.deletedCount > 0) {
        res
          .status(200)
          .json({ message: "File and record deleted successfully" });
      } else {
        res.status(404).json({ message: "Record not found in database" });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting file or record", details: err });
  }
};
