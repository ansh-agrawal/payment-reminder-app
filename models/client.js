import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    Email: { 
        type: String,
        required: true,
        unique: true
    },
    Id_Number: {
        type: Number,
        required: true
    },
    Client_Name: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    }
}, { 
    collection: "client", // Equivalent to tableName in Sequelize
    timestamps: false // Disables automatic `createdAt` and `updatedAt`
});

// Creating the model
const Client = mongoose.model("Client", clientSchema);

export default Client;
