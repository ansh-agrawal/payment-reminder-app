import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    InvoiceId: {
        type: Number,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        ref: "Client" // Reference to Client model
    },
    Location: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Task: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    },
    Paid: {
        type: Boolean,
        default: false
    }
}, {
    collection: "invoice",
    timestamps: true // Automatically adds `createdAt` & `updatedAt`
});

// Creating the model
const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
