const db = require("../models");
const Asset = db.Assets;
const { logger } = require("../../server");

// Create a new asset
exports.createAsset = async (projectId, assetData) => {
  logger.info(`Creating asset for project ${projectId} in the repository with data: ${JSON.stringify(assetData)}`);

  try {
    const asset = Asset.create({ ...assetData, project_id: projectId });
    logger.info(`Asset created for project ${projectId} in the repository: ${JSON.stringify(asset)}`);
    return asset;
  } catch (error) {
    logger.error(`Error creating asset in the repository: ${error.message}`);
    throw error;
  }
};

// Retrieve all assets for a project
exports.getAllAssets = async (projectId) => {
  try {
    const assets = await Asset.findAll({ where: { project_id: projectId } });
    return assets;
  } catch (error) {
    logger.error(`Error getting all assets in the repository layer: ${error.message}`);
    throw error;
  }
};

// Retrieve a single asset by ID
exports.getAssetById = async (assetId) => {
  try {
    const asset = await Asset.findByPk(assetId);
    return asset;
  } catch (error) {
    logger.error(`Error getting asset by ID in the repository layer: ${error.message}`);
    throw error;
  }
};
