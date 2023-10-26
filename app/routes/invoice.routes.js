const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");
const checkUserRole = require("../middleware/checkUserRole");


// Define routes for CRUD operations
router.post(
  "/",
  checkUserRole(["admin", "readonly"]),
  invoiceController.create
);
router.get("/", invoiceController.findAll);
router.get("/:id", invoiceController.findOne);
router.put(
  "/:id",
  checkUserRole(["admin", "readonly"]),
  invoiceController.update
);
router.delete(
  "/:id",
  checkUserRole(["admin", "readonly"]),
  invoiceController.delete
);

module.exports = router;
