
const Complaint = require("../models/complaint.model");

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, imageUrl, location } = req.body;
    const userId = req.user.userId; // comes from auth middleware

    const complaint = await Complaint.create({
      userId,
      title,
      description,
      category,
      imageUrl,
      location,
    });

    res.status(201).json({ msg: "Complaint submitted", complaint });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get All Complaints for Logged-in User
exports.getMyComplaints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const complaints = await Complaint.find({ userId });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get Complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update Complaint Status (Admin Only)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });

    complaint.status = status;
    await complaint.save();

    res.json({ msg: "Status updated", complaint });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });

    res.json({ msg: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
