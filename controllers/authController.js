const LoginData = require("../models/loginDataModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await LoginData.findOne({ email, password });
    if (user) {
      res.status(200).json({ result: "success", user });
    } else {
      res.status(400).json({ result: "Invalid User" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error during login", details: error });
  }
};

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, aboutyou } = req.body;
  if (firstname && lastname && email) {
    try {
      const newUser = new LoginData({
        firstname,
        lastname,
        email,
        password,
        aboutyou,
      });
      const result = await newUser.save();
      res.status(200).json({ result: "success" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(500).json({ error: "Error during signup", details: error });
      }
    }
  } else {
    res
      .status(400)
      .json({ result: "error", message: "Please fill required details" });
  }
};
