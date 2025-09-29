const express = require("express");
const router = express.Router();
const ValidationQ = require("../models/ValidationQ");

// GET questions for a position
router.get("/", async (req, res) => {
  const { position } = req.query;
  try {
    const questions = await ValidationQ.find({ position });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
