const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const checkUserRole = require("../middleware/checkUserRole");

// Define routes for CRUD operations
router.post(
  "/",
  checkUserRole(["admin", "readonly"]),
  projectController.create
);
router.get("/", projectController.findAll);
router.get("/:id", projectController.findOne);
router.put(
  "/:id",
  checkUserRole(["admin", "readonly"]),
  projectController.update
);
router.delete(
  "/:id",
  checkUserRole(["admin", "readonly"]),
  projectController.delete
);

module.exports = router;
