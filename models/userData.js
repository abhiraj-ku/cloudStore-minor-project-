const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  emailid: { type: String, required: true },
  filelocation: String,
  filekey: String,
  filename: String,
  created: { type: Date, default: Date.now },
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
