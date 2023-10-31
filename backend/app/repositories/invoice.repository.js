const db = require('../models');
const Invoice = db.Invoice;


exports.create = async (invoiceData) => {
  return Invoice.create(invoiceData);
};

exports.getAllInvoices = async () => {
  return Invoice.findAll();
};

exports.getInvoiceById = async (invoiceId) => {
  return Invoice.findByPk(invoiceId);
};

exports.updateInvoice = async (invoiceId, invoiceData) => {
  const invoice = await Invoice.findByPk(invoiceId);

  if (!invoice) {
    return null;
  }

  // Implement the logic to update the invoice with invoiceData here

  return invoice; // You should return the updated invoice
};

exports.deleteInvoice = async (invoiceId) => {
  const invoice = await Invoice.findByPk(invoiceId);

  if (!invoice) {
    return false;
  }

  await invoice.destroy(); // Use await to delete the invoice

  return true; // Return true to indicate success
};