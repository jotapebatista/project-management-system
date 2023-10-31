const InvoiceService = require("../services/invoice.service");

exports.create = async (req, res) => {
  const invoiceData = req.body; // Corrected variable name

  try {
    const invoice = await InvoiceService.createInvoice(invoiceData); // Corrected function name
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

exports.findAll = async (req, res) => {
  const invoices = await InvoiceService.getAllInvoices(); // Corrected function name
  res.json(invoices);
};

exports.findOne = async (req, res) => {
  const invoiceId = req.params.id;
  const invoice = await InvoiceService.getInvoiceById(invoiceId); // Corrected function name

  if (!invoice) {
    res.status(404).json({ message: "Invoice not found." });
  } else {
    res.json(invoice);
  }
};

exports.update = async (req, res) => {
  const invoiceId = req.params.id;
  const invoiceData = req.body;

  const updatedInvoice = await InvoiceService.updateInvoice(invoiceId, invoiceData); // Corrected function name

  if (!updatedInvoice) {
    res.status(404).json({ message: "Invoice not found." });
  } else {
    res.json(updatedInvoice);
  }
};

exports.delete = async (req, res) => {
  const invoiceId = req.params.id;

  const result = await InvoiceService.deleteInvoice(invoiceId); // Corrected function name

  if (result) {
    res.json({ message: "Invoice was successfully deleted." });
  } else {
    res.status(404).json({ message: "Invoice not found." });
  }
};
