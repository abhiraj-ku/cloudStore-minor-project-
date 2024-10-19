exports.validateFileType = (allowedTypes) => (req, res, next) => {
  const files = req.files || [];
  for (let file of files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }
  }
  next();
};
