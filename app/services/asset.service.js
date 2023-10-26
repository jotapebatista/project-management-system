const AssetRepository = require("../repositories/asset.repository");

// Create a new asset
exports.createAsset = async (projectId, assetData) => {
  console.log(
    `Creating asset for project ${projectId} in the service layer with data:`,
    assetData
  );

  try {
    const asset = await AssetRepository.createAsset(projectId, assetData);
    console.log(
      `Asset created for project ${projectId} in the service layer:`,
      asset
    );
    return asset;
  } catch (error) {
    console.error("Error creating asset in the service layer:", error);
    throw error;
  }
};

// Retrieve all assets for a project
exports.getAllAssets = async (projectId) => {
  return AssetRepository.getAllAssets(projectId);
};

// Retrieve a single asset by ID
exports.getAssetById = async (assetId) => {
  return AssetRepository.getAssetById(assetId);
};
