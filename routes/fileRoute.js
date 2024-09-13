const express = require("express");
const fileController = require("../controllers/fileController");
const shareController = require("../controllers/shareController");

const router = express.Router();

// File routes
router.post("/upload", fileController.uploadUserData);
router.get("/preview", fileController.previewFile);
router.post("/delete", fileController.deleteUserData);

// Share routes
router.post("/share", shareController.createLink);
router.get("/access", shareController.accessFile);

module.exports = router;
