

const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/role.middleware");
const Complaint = require("../models/complaint.model");

const router = express.Router();

// Admin → Get ALL complaints
router.get("/complaints", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("userId", "name email");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
