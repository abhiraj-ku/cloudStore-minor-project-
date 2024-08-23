const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();

app.use(express.static(__dirname + "/"));
app.set("views", __dirname + "/views");
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// MongoDB connection setup using Mongoose
mongoose
  .connect("mongodb://localhost:27017/cloudStore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 8081);

// CORS Middleware
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:8080"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Origin,Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

http.createServer(app).listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
