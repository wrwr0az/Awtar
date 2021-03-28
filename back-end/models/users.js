// Require necessary NPM packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define Article Schema
const usersSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    publishedOn: { type: Date, default: Date.now },
    refreshtoken: { type: String },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  let hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

usersSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Compile our Model based on the Schema
const User = mongoose.model("User", usersSchema);

// Export our Model for use
module.exports = User;
