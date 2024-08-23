const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const userController = require("../controllers/userController");

// S3 configuration
aws.config.loadFromPath("config.json");
aws.config.update({ signatureVersion: "v4" });
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cloudstoreimgpr",
    acl: "public-read",
    destination: (req, file, cb) => cb(null, "contact/"),
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, Date.now().toString() + file.originalname),
  }),
  limits: { fileSize: 10000000 },
});

const router = express.Router();

router.get("/delete", userController.deleteUserData);
router.get("/userdata", userController.getUserData);
router.post("/userdata", upload.any(), userController.uploadUserData);

module.exports = router;
