// scripts/seedValidationQuestions.js
require("dotenv").config();
const mongoose = require("mongoose");
const ValidationQ = require("./models/ValidationQ"); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI;

const questions = [
  {
    position: "Seater/Names",
    text: "Describe how you greet a guest upon arrival."
  },
  {
    position: "Seater/Names",
    text: "Explain the steps to properly seat a guest."
  },
  {
    position: "Coordinator",
    text: "How do you handle table turnovers efficiently?"
  },
  {
    position: "SA",
    text: "What is your process for assisting servers during peak hours?"
  },
  {
    position: "Server",
    text: "Describe your method for taking orders accurately."
  },
  {
    position: "Server",
    text: "How do you manage multiple tables simultaneously?"
  },
  {
    position: "ToGo",
    text: "Explain the process for ensuring ToGo orders are correct."
  },
  {
    position: "Bartender",
    text: "Describe your steps to prepare a cocktail correctly."
  },
  {
    position: "Bartender",
    text: "How do you manage multiple drink orders efficiently?"
  }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Optional: remove all existing questions first
    await ValidationQ.deleteMany({});
    console.log("Cleared existing validation questions");

    // Insert new questions
    const inserted = await ValidationQ.insertMany(questions);
    console.log(`Inserted ${inserted.length} questions`);

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });
