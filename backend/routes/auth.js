// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/login
router.post("/login", async (req, res) => {
  const { posId, password } = req.body;

  try {
    const user = await User.findOne({ posId });

    if (!user) return res.json({ success: false, message: "POS ID not found" });

    if (user.password !== password) return res.json({ success: false, message: "Incorrect password" });

    // Check if first-time login (password still equals posId)
    const firstTime = user.password === user.posId;

    res.json({ success: true, firstTime, user: { posId: user.posId, firstName: user.firstName, lastName: user.lastName, userType: user.userType } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/first-time-setup
router.post("/first-time-setup", async (req, res) => {
  const { posId, firstName, lastName, newPassword } = req.body;

  try {
    const user = await User.findOne({ posId });
    if (!user) return res.json({ success: false, message: "POS ID not found" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.password = newPassword;

    await user.save();

    res.json({ success: true, user: { posId: user.posId, firstName, lastName, userType: user.userType } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
