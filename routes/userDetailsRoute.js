const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const path = require("path");
const userController = require("../controllers/userController");
const { validateFileType } = require("../middlewares/fileValidation");
const { errorHandler } = require("../middlewares/errorHandler");
const rateLimit = require("express-rate-limit");

// S3 configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedMimes = ["image/jpeg", "image/png", "image/gif"];

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cloudstore-files",
    acl: "private", // Changed from public-read for better security
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err);
        cb(
          null,
          `contact/${raw.toString("hex")}${path.extname(file.originalname)}`
        );
      });
    },
  }),
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: {
    fileSize: 20 * 1024 * 1024, // 5MB limit
    files: 5, // max 5 files per upload
  },
});

const router = express.Router();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.use(limiter);
const { authMiddleware } = require("../middlewares/authMiddleware");

// Routes
router.delete("/userdata", authMiddleware, userController.deleteUserData);
router.get("/userdata", authMiddleware, userController.getUserData);
router.post(
  "/userdata",
  validateFileType(allowedMimes),
  upload.array("files", 5),
  authMiddleware, // 'files' is the field name, max 5 files
  userController.uploadUserData
);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
