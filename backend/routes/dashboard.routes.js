
// routes/dashboard.routes.js
const express = require("express");
const Complaint = require("../models/complaint.model");

const router = express.Router();

// Public → Get only resolved complaints
router.get("/resolved", async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: "Resolved" }).populate("userId", "name email");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
