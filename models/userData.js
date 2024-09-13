const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  emailid: String,
  filelocation: String,
  filekey: String,
  filename: String,
  version: { type: Number, default: 1 },
  created: { type: Date, default: Date.now },
  sharedWith: [
    {
      email: String,
      permission: String, // view, comment, edit
    },
  ],
  shareableLink: String,
  linkExpiresAt: Date,
  password: String, // hashed password for protected links
});

module.exports = mongoose.model("FileData", fileSchema);
