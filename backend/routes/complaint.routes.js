
const express = require("express");
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaint.controller");

const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

// User routes
router.post("/", authMiddleware, createComplaint);
router.get("/", authMiddleware, getMyComplaints);
router.get("/:id", authMiddleware, getComplaintById);
router.delete("/:id", authMiddleware, deleteComplaint);

// Admin route → update status
router.patch("/:id/status", authMiddleware, adminMiddleware, updateComplaintStatus);

module.exports = router;
