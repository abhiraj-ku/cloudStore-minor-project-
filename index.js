require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userDetailsRoute");
const PORT = process.env.PORT;
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(cors());

// MongoDB connection setup using Mongoose
mongoose
  .connect("mongodb://localhost:27017/cloudStore")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for Helmet config
app.get("/", (req, res) => {
  res.send("hello from cloudstore");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
