
// routes/chatbot.routes.js
const express = require("express");
const Complaint = require("../models/complaint.model");
const router = express.Router();

// Chatbot API → Check status
router.post("/status", async (req, res) => {
  try {
    const { email, complaintId } = req.body;

    const complaint = await Complaint.findById(complaintId).populate("userId", "email");
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    if (complaint.userId.email !== email) {
      return res.status(403).json({ msg: "You are not authorized to view this complaint" });
    }

    res.json({
      complaintId: complaint._id,
      title: complaint.title,
      status: complaint.status,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
