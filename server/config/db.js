const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Atlas Database Connected");
  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

module.exports = connectDb;