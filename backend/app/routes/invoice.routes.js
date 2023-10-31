const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");
const checkUserRole = require("../middleware/checkUserRole");
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

router.post(
  "/:projectId/invoices",
  checkUserRole(["admin", "readonly"]),
  upload.single("file"), 
  invoiceController.create
);
router.get("/:projectId/invoices", invoiceController.findAll);
router.get("/:id", invoiceController.findOne);
router.put("/:id", checkUserRole(["admin", "readonly"]), invoiceController.update);
router.delete("/:id", checkUserRole(["admin", "readonly"]), invoiceController.delete);

module.exports = router;