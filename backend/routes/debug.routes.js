const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint.model");
const User = require("../models/user.model");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Debug endpoint to check user and complaints
router.get("/check-data", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get current user info
    const currentUser = await User.findById(userId);
    
    // Get all complaints in database
    const allComplaints = await Complaint.find().limit(5);
    
    // Get user's complaints
    const userComplaints = await Complaint.find({ userId });
    
    // Get all users
    const allUsers = await User.find().select('-password').limit(5);
    
    res.json({
      currentUser: {
        id: currentUser?._id,
        email: currentUser?.email,
        name: currentUser?.name,
        role: currentUser?.role
      },
      tokenUserId: userId,
      userComplaintsCount: userComplaints.length,
      totalComplaintsInDB: await Complaint.countDocuments(),
      sampleComplaints: allComplaints.map(c => ({
        id: c._id,
        title: c.title,
        userId: c.userId,
        userIdType: typeof c.userId,
        matchesCurrentUser: String(c.userId) === String(userId)
      })),
      allUsers: allUsers.map(u => ({
        id: u._id,
        email: u.email,
        name: u.name,
        role: u.role
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
