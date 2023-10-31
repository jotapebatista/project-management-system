const express = require("express");
const router = express.Router();
const checkUserRole = require("../middleware/checkUserRole");

function generateCRUDRoutes(controller, role) {
  router.post("/", checkUserRole(role), controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", controller.findOne);
  router.put("/:id", checkUserRole(role), controller.update);
  router.delete("/:id", checkUserRole(role), controller.delete);
}

module.exports = { router, generateCRUDRoutes };
