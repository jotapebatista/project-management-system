const minioClient = require("../../config/minio.config");



minioClient.makeBucket("assets", function (err) {
  if (err) return console.log("Error creating bucket.", err);
  console.log("Bucket created successfully.");
});

// Function to upload a file to MinIO
exports.uploadFileToMinIO = async (bucketName, objectName, filePath) => {
  try {
    await minioClient.fPutObject(bucketName, objectName, filePath);
    console.log(`File uploaded to MinIO: ${objectName}`);
  } catch (error) {
    console.error("Error uploading file to MinIO:", error);
  }
};

// Function to download a file from MinIO
exports.downloadFileFromMinIO = async (
  bucketName,
  objectName,
  downloadPath
) => {
  try {
    await minioClient.fGetObject(bucketName, objectName, downloadPath);
    console.log(`File downloaded from MinIO: ${objectName}`);
  } catch (error) {
    console.error("Error downloading file from MinIO:", error);
  }
};
