import express  from "express";
import {createInvoice, sendInvoice}  from "../controllers/invoiceController.js";
import { authenticate } from "../middlewares/auth.js";

const invoiceRouter = express.Router();

// Add client route
invoiceRouter.post('/create', authenticate, createInvoice);
invoiceRouter.get('/send/:id', authenticate, sendInvoice);

export default invoiceRouter