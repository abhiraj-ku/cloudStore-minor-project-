const {
  createShareableLink,
  accessSharedFile,
} = require("../services/shareService");

// Create a shareable link
exports.createLink = async (req, res) => {
  try {
    const link = await createShareableLink(req.body);
    res.status(200).json(link);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating shareable link", details: error });
  }
};

// Access file through shareable link
exports.accessFile = async (req, res) => {
  try {
    const file = await accessSharedFile(req.query);
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(404).json({ message: "Link expired or invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error accessing file", details: error });
  }
};
