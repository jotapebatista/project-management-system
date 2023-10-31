const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'localhost', // MinIO server address
  port: 9000, // Default MinIO port
  useSSL: false, // Set to true if using SSL
  accessKey: 'adminkey', // Access key set in docker-compose
  secretKey: 'admin_key', // Secret key set in docker-compose
});

module.exports = minioClient;


// // Example usage:
// const bucketName = 'your-bucket-name'; // Create a MinIO bucket first
// const localFilePath = '/path/to/local/file.txt';
// const minioObjectName = 'file.txt';

// // Upload a file to MinIO
// uploadFileToMinIO(bucketName, minioObjectName, localFilePath);

// // Download a file from MinIO
// const downloadFilePath = '/path/to/downloaded/file.txt';
// downloadFileFromMinIO(bucketName, minioObjectName, downloadFilePath);
