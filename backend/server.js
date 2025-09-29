// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api", authRoutes);

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
