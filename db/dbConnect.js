import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/invoicingApp"; // Replace "invoicingApp" with your database name

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("MongoDB Connection Failed:", err));

export default mongoose;
