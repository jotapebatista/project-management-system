const express = require("express");
const router = express.Router();
const assetController = require("../controllers/asset.controller");
const checkUserRole = require("../middleware/checkUserRole");
const multer = require('multer');
const upload = multer({dest: "uploads/"});

// Create a new asset for a project
router.post(
  "/:projectId/assets",
  checkUserRole(["admin"]),
  upload.single("file"),
  assetController.create
);

// Retrieve all assets for a project
router.get("/:projectId/assets", assetController.findAll);

// Retrieve a single asset by ID
router.get("/:projectId/assets/:assetId", assetController.findOne);

// Download an asset file
router.get("/:projectId/assets/:assetId/download", assetController.download);

module.exports = router;
