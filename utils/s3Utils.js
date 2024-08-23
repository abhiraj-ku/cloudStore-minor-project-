const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.deleteFileFromS3 = async (params) => {
  try {
    const data = await s3.deleteObject(params).promise();
    return data;
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    throw err;
  }
};
