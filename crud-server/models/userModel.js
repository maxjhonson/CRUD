const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "PRODUCT_CREATORS", "PRODUCT_MANAGERS", "PRODUCT_PRICING "],
    default: "USER",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
