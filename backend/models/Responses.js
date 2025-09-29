// models/Responses.js
const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  position: { type: String, required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "ValidationQ", required: true },
      answer: { type: String, required: true } // text input
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Responses", ResponseSchema);
