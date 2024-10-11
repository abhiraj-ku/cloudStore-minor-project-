kl;const aws = require("aws-sdk");
const s3 = new aws.S3();

const s3config = require("../config/awsConfig");

// Upload file to S3
exports.uploadFileToS3 = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.filename,
    Body: file.buffer,
  };

  return s3.upload(params).promise();
};

// Delete file from S3
exports.deleteFileFromS3 = (params) => {
  return s3.deleteObject(params).promise();
};
