const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  posId: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // initially same as posId
  firstName: { type: String },
  lastName: { type: String },
  userType: { type: String, enum: ["trainee", "trainer", "manager"], default: "trainee" }
});

module.exports = mongoose.model("User", userSchema);
