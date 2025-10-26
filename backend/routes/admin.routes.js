

const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/role.middleware");
const Complaint = require("../models/complaint.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const router = express.Router();

// Admin → Get ALL complaints with pagination and filtering
router.get("/complaints", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    const complaints = await Complaint.find(filter)
      .populate("userId", "name email")
      .populate("adminComments.adminId", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    const total = await Complaint.countDocuments(filter);
    
    res.json({
      complaints,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Admin → Get complaint statistics
router.get("/statistics", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Admin statistics route hit by user:', req.user);
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: "Pending" });
    const inProgressComplaints = await Complaint.countDocuments({ status: "In Progress" });
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });
    
    const categoryStats = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      total: totalComplaints,
      pending: pendingComplaints,
      inProgress: inProgressComplaints,
      resolved: resolvedComplaints,
      categoryBreakdown: categoryStats
    });
  } catch (error) {
    console.error('Statistics error:', error);
    res.status(500).json({ msg: error.message });
  }
});

// Admin → Create admin user (for testing)
router.post("/create-admin", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // Update existing user to admin
      existingUser.role = "admin";
      await existingUser.save();
      return res.json({ msg: "User updated to admin", user: { email: existingUser.email, role: existingUser.role } });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const adminUser = await User.create({
      name: name || "Admin",
      email,
      password: hashedPassword,
      role: "admin"
    });
    
    res.json({ msg: "Admin user created", user: { email: adminUser.email, role: adminUser.role } });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
