const db = require("../models");
const Asset = db.Assets;

// Create a new asset
exports.createAsset = async (projectId, assetData) => {
  return Asset.create({ ...assetData, project_id: projectId });
};

// Retrieve all assets for a project
exports.getAllAssets = async (projectId) => {
  return Asset.findAll({ where: { project_id: projectId } });
};

// Retrieve a single asset by ID
exports.getAssetById = async (assetId) => {
  return Asset.findByPk(assetId);
};

// Delete an asset by ID
exports.deleteAsset = async (assetId) => {
  const asset = await Asset.findByPk(assetId);

  if (!asset) {
    return false; // Handle the case where the asset is not found
  }

  return asset.destroy();
};
