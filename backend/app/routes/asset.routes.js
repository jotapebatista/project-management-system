const express = require("express");
const router = express.Router();
const assetController = require("../controllers/asset.controller");
const checkUserRole = require("../middleware/checkUserRole");
const multer = require('multer');
const upload = multer({dest: "uploads/"});


router.post(
  "/:projectId/assets",
  checkUserRole(["admin"]),
  upload.single("file"),
  assetController.create
);
router.get("/:projectId/assets", assetController.findAll);
router.get("/:projectId/assets/:assetId", assetController.findOne);
router.get("/:projectId/assets/:assetId/download", assetController.download);

module.exports = router;
