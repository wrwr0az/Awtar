// Require necessary NPM packages
const mongoose = require("mongoose");

// Define Article Schema
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    mobileNumber: { type: String, required: true },
    location: { type: String, required: true },
    message: { type: String, required: true },
    publishedOn: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Compile our Model based on the Schema
const Message = mongoose.model("Message", messageSchema);

// Export our Model for use
module.exports = Message;
