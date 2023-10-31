const AssetRepository = require("../repositories/asset.repository");
const { logger } = require("../../server");

// Create a new asset
exports.createAsset = async (projectId, assetData) => {
  logger.info(
    `Creating asset for project ${projectId} in the service layer with data: ${assetData}`
  );

  try {
    const asset = await AssetRepository.createAsset(projectId, assetData);
    return asset;
  } catch (error) {
    logger.error(`Error creating asset in the service layer: ${error.message}`);
    throw error;
  }
};

// Retrieve all assets for a project
exports.getAllAssets = async (projectId) => {
  try {
    const assets = await AssetRepository.getAllAssets(projectId);
    return assets;
  } catch (error) {
    logger.error(
      `Error getting all assets in the service layer: ${error.message}`
    );
    throw error;
  }
};

// Retrieve a single asset by ID
exports.getAssetById = async (assetId) => {
  try {
    const asset = AssetRepository.getAssetById(assetId);
    return asset;
  } catch (error) {
    logger.error(
      `Error getting asset by ID in the service layer: ${error.message}`
    );
    throw error;
  }
};

// Delete an asset by ID
exports.deleteAsset = async (assetId) => {
  return AssetRepository.deleteAsset(assetId);
};
