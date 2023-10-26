const AssetService = require("../services/asset.service");
const {
  uploadFileToMinIO,
  downloadFileFromMinIO,
} = require("../utils/minio-utils");

// Create a new asset
exports.create = async (req, res) => {
  console.log(
    `Creating asset for project ${req.params.projectId} with data:`,
    req.body
  );

  try {
    const { file } = req.files;
    if (!file) {
      return res.status(400).json({ message: "File not provided" });
    }

    // You can generate a unique file name, or use the original file name
    const fileName = file.name;

    // Set the MinIO object name based on the project and file name
    const objectName = `projects/${req.params.projectId}/assets/${fileName}`;

    // Upload the file to MinIO
    await uploadFileToMinIO("assets", objectName, file.path);

    const assetData = {
      file_name: fileName,
      file_path: objectName,
      // Add other asset-related data here
    };

    const asset = await AssetService.createAsset(assetData);
    res.status(201).json(asset);
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve all assets for a project
exports.findAll = async (req, res) => {
  const assets = await AssetService.getAllAssets(req.params.projectId);
  res.json(assets);
};

// Retrieve a single asset by ID
exports.findOne = async (req, res) => {
  const assetId = req.params.assetId;
  const asset = await AssetService.getAssetById(assetId);

  if (!asset) {
    res.status(404).json({ message: "Asset not found." });
  } else {
    res.json(asset);
  }
};

// Download an asset file
exports.download = async (req, res) => {
  const assetId = req.params.assetId;
  const asset = await AssetService.getAssetById(assetId);

  if (!asset) {
    res.status(404).json({ message: "Asset not found." });
  } else {
    const { file_path, file_name } = asset;
    const downloadPath = `/tmp/${file_name}`; // Set the download path on your server

    // Download the asset file from MinIO to the server
    await downloadFileFromMinIO("assets", file_path, downloadPath);

    // Send the file as a response
    res.download(downloadPath, file_name, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }
};
