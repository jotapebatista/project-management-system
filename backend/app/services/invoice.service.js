const db = require("../models");
const Project = db.Project;
const InvoiceRepository = require("../repositories/invoice.repository");

exports.createInvoice = async (invoiceData) => {
  return InvoiceRepository.create(invoiceData);
};

exports.getAllInvoices = async () => {
  return InvoiceRepository.getAllInvoices();
};

exports.getInvoiceById = async (invoiceId) => {
  return InvoiceRepository.getInvoiceById(invoiceId); 
};

exports.updateInvoice = async (invoiceId, invoiceData) => {
  return InvoiceRepository.updateInvoice(invoiceId, invoiceData); 
};

exports.deleteInvoice = async (invoiceId) => {
  return InvoiceRepository.deleteInvoice(invoiceId); 
};