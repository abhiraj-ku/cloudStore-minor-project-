const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  aboutyou: String,
});

const LoginData = mongoose.model("LoginData", loginSchema);

module.exports = LoginData;
