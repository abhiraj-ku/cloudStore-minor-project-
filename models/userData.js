const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sharedWithSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    permission: {
      type: String,
      required: true,
      enum: ["view", "comment", "edit"],
    },
  },
  { _id: false }
);

const fileSchema = new mongoose.Schema(
  {
    emailid: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    filelocation: {
      type: String,
      required: true,
      trim: true,
    },
    filekey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    version: {
      type: Number,
      default: 1,
      min: 1,
    },
    created: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
    sharedWith: [sharedWithSchema],
    shareableLink: {
      type: String,
      trim: true,
      sparse: true,
      unique: true,
    },
    linkExpiresAt: Date,
    password: {
      type: String,
      minlength: 6,
      select: false, // Exclude password by default in query results
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Indexes
fileSchema.index({ emailid: 1, filename: 1 });
fileSchema.index({ shareableLink: 1 }, { sparse: true });

// Pre-save hook to hash password
fileSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
fileSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for file URL (assuming you have a base URL for file access)
fileSchema.virtual("fileUrl").get(function () {
  return `https://your-file-server.com/files/${this.filekey}`;
});

module.exports = mongoose.model("FileData", fileSchema);
