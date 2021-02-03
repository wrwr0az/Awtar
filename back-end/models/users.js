// Require necessary NPM packages
const mongoose = require("mongoose");

// Define Article Schema
const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    publishedOn: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Compile our Model based on the Schema
const User = mongoose.model("User", usersSchema);

// Export our Model for use
module.exports = User;
