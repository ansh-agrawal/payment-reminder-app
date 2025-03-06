import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Email: { 
        type: String,
        required: true,
        unique: true
    },
    User_Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, { 
    collection: "user", // Equivalent to tableName in Sequelize
    timestamps: false // No automatic createdAt and updatedAt
});

// Creating the model
const User = mongoose.model("User", userSchema);

export default User;
