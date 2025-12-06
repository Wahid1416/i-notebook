const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Failed to connect Mongo:", error);
    }
};

mongoose.connection.on("connected", () => {
  console.log("🔥 MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ MongoDB Error:", err);
});

module.exports = connectToMongo;
