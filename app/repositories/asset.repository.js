const db = require("../models");
const Asset = db.Assets;

// Create a new asset
exports.createAsset = async (projectId, assetData) => {
  console.log(`Creating asset for project ${projectId} in the repository with data:`, assetData);

  try {
    const asset = Asset.create({ ...assetData, projectId });
    console.log(`Asset created for project ${projectId} in the repository:`, asset);
    return asset;
  } catch (error) {
    console.error('Error creating asset in the repository:', error);
    throw error;
  }
}

// Retrieve all assets for a project
exports.getAllAssets = async (projectId) => {
  return Asset.findAll({ where: { projectId } });
};

// Retrieve a single asset by ID
exports.getAssetById = async (assetId) => {
  return Asset.findByPk(assetId);
};
