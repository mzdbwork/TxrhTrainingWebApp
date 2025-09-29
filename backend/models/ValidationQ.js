const mongoose = require("mongoose");

const ValidationQSchema = new mongoose.Schema({
  position: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("ValidationQ", ValidationQSchema);
