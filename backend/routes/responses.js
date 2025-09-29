const express = require("express");
const router = express.Router();
const Response = require("../models/Responses");

// POST a set of answers
router.post("/", async (req, res) => {
  const { position, answers, userId } = req.body;

  try {
    const newResponse = new Response({ position, userId, answers });
    await newResponse.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET responses (for manager)
router.get("/", async (req, res) => {
  const { position, userId } = req.query;
  try {
    const responses = await Response.find({ position, userId });
    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
