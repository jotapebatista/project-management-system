const AssetService = require("../services/asset.service");
const {
  uploadFileToMinIO,
  downloadFileFromMinIO,
} = require("../utils/minio-utils");
const { logger } = require("../../server");

// Create a new asset
exports.create = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      logger.error("File not provided");
      return res.status(400).json({ message: "File not provided" });
    }

    const fileName = file.originalname;
    const objectName = `projects/${req.params.projectId}/assets/${fileName}`;

    if (typeof file.path !== "string") {
      logger.error("Invalid file path");
      return res.status(400).json({ message: "Invalid file path" });
    }

    // Upload the file to MinIO
    await uploadFileToMinIO("assets", objectName, file.path);

    const assetData = {
      file_name: fileName,
      file_path: objectName,
    };

    const asset = await AssetService.createAsset(
      req.params.projectId,
      assetData
    );
    logger.info(`New asset created: ${asset.id}`);
    res.status(201).json(asset);
  } catch (error) {
    logger.error(`Error creating asset: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Download an asset file
exports.download = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const asset = await AssetService.getAssetById(assetId);

    if (!asset) {
      logger.error("Asset not found");
      res.status(404).json({ message: "Asset not found." });
    } else {
      const { file_path, file_name } = asset;
      const downloadPath = `/tmp/${file_name}`; // Set the download path on your server

      await downloadFileFromMinIO("assets", file_path, downloadPath);

      // Send the file as a response
      res.download(downloadPath, file_name, (err) => {
        if (err) {
          logger.error(`Error downloading file: ${err.message}`);
          res.status(500).json({ message: "Internal server error" });
        }
      });
      logger.info(`Asset downloaded: ${assetId}`);
    }
  } catch (error) {
    logger.error(`Error downloading asset: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve all assets for a project
exports.findAll = async (req, res) => {
  try {
    const assets = await AssetService.getAllAssets(req.params.projectId);
    res.json(assets);
  } catch (error) {
    logger.error(`Error retrieving assets: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve a single asset by ID
exports.findOne = async (req, res) => {
  const assetId = req.params.assetId;

  try {
    const asset = await AssetService.getAssetById(assetId);

    if (!asset) {
      logger.error("Asset not found");
      res.status(404).json({ message: "Asset not found." });
    } else {
      res.json(asset);
    }
  } catch (error) {
    logger.error(`Error retrieving asset: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
