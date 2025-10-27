
// const Complaint = require("../models/complaint.model");

// // Create Complaint
// exports.createComplaint = async (req, res) => {
//   try {
//     const { title, description, category, imageUrl, location } = req.body;
//     const userId = req.user.userId; // comes from auth middleware

//     const complaint = await Complaint.create({
//       userId,
//       title,
//       description,
//       category,
//       imageUrl,
//       location,
//     });

//     res.status(201).json({ msg: "Complaint submitted", complaint });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Get All Complaints for Logged-in User
// exports.getMyComplaints = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const complaints = await Complaint.find({ userId });
//     res.json(complaints);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Get Complaint by ID
// exports.getComplaintById = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });
//     res.json(complaint);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Update Complaint Status (Admin Only)
// exports.updateComplaintStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });

//     complaint.status = status;
//     await complaint.save();

//     res.json({ msg: "Status updated", complaint });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Delete Complaint
// exports.deleteComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.findByIdAndDelete(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });

//     res.json({ msg: "Complaint deleted" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };





// const Complaint = require("../models/complaint.model");
// const cloudinary = require("../config/cloudinary");

// // Create Complaint with Cloudinary image upload
// exports.createComplaint = async (req, res) => {
//   try {
//     const { title, description, category, location } = req.body;
//     const userId = req.user.userId;

//     let imageUrl = null;

//     if (req.file) {
//       const result = await cloudinary.uploader.upload_stream(
//         { folder: "complaints" },
//         (error, result) => {
//           if (error) throw error;
//           imageUrl = result.secure_url;
//         }
//       );
//       result.end(req.file.buffer);
//     }

//     const complaint = await Complaint.create({
//       userId,
//       title,
//       description,
//       category,
//       imageUrl,
//       location: typeof location === "string" ? JSON.parse(location) : location,
//     });

//     res.status(201).json({ msg: "Complaint submitted", complaint });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Get All Complaints for Logged-in User
// exports.getMyComplaints = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const complaints = await Complaint.find({ userId });
//     res.json(complaints);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Get Complaint by ID
// exports.getComplaintById = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });
//     res.json(complaint);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Update Complaint Status (Admin Only)
// exports.updateComplaintStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });

//     complaint.status = status;
//     await complaint.save();

//     res.json({ msg: "Status updated", complaint });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Delete Complaint
// exports.deleteComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.findByIdAndDelete(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });

//     res.json({ msg: "Complaint deleted" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };





// const Complaint = require("../models/complaint.model");
// const cloudinary = require("../config/cloudinary");

// // Create Complaint with Cloudinary image upload
// exports.createComplaint = async (req, res) => {
//   try {
//     const { title, description, category, location } = req.body;
//     const userId = req.user.userId;

//     if (!title || !description || !category || !location) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     // Parse location if sent as string (form-data)
//     const parsedLocation = typeof location === "string" ? JSON.parse(location) : location;

//     let imageUrl = null;

//     if (req.file) {
//       // Wrap Cloudinary upload_stream in a Promise so we can await it
//       const uploadResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "complaints" },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         stream.end(req.file.buffer);
//       });

//       imageUrl = uploadResult.secure_url;
//     }

//     const complaint = await Complaint.create({
//       userId,
//       title,
//       description,
//       category,
//       imageUrl,
//       location: parsedLocation,
//     });

//     res.status(201).json({ msg: "Complaint submitted", complaint });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Get All Complaints for Logged-in User
// exports.getMyComplaints = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const complaints = await Complaint.find({ userId });
//     res.json(complaints);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };


// // View all complaints (for both users & admins)
// exports.getAllComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find(); // fetch all complaints
//     res.json(complaints);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };


// // Get Complaint by ID
// exports.getComplaintById = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });
//     res.json(complaint);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Update Complaint Status (Admin Only)
// exports.updateComplaintStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });

//     complaint.status = status;
//     await complaint.save();

//     res.json({ msg: "Status updated", complaint });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Delete Complaint

// exports.deleteComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ msg: "Not found" });

//     // Only allow user to delete their own complaint
//     if (complaint.userId.toString() !== req.user.userId) {
//       return res.status(403).json({ msg: "You can delete only your own complaints" });
//     }

//     await complaint.remove();
//     res.json({ msg: "Complaint deleted" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };




const Complaint = require("../models/complaint.model");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user.model");
const { sendStatusUpdateEmail, sendComplaintSubmittedEmail } = require("../utils/emailService");

// Create Complaint (image uploaded from frontend)
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, imageUrl } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const parsedLocation = typeof location === "string" ? JSON.parse(location) : location;

    // Create complaint with all data
    const complaint = await Complaint.create({
      userId,
      title,
      description,
      category,
      imageUrl: imageUrl || null,
      location: parsedLocation,
    });

    // Send response immediately
    res.status(201).json({ msg: "Complaint submitted", complaint });

    // Send confirmation email in background (don't await)
    User.findById(userId)
      .then(user => {
        if (user) {
          return sendComplaintSubmittedEmail(user.email, user.name, complaint);
        }
      })
      .catch(emailError => {
        console.error('Failed to send confirmation email:', emailError.message);
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get complaints of logged-in user
exports.getMyComplaints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const complaints = await Complaint.find({ userId });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all complaints (for users & admins)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update complaint status (Admin only) + Send email notification
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    // Update status
    complaint.status = status;
    
    // Add admin comment if provided
    if (comment && comment.trim()) {
      // Get admin user details
      const adminUser = await User.findById(req.user.userId);
      const adminComment = {
        comment: comment.trim(),
        adminId: req.user.userId,
        adminName: adminUser ? (adminUser.name || adminUser.email) : 'Admin',
        timestamp: new Date()
      };
      
      // Initialize adminComments if it doesn't exist
      if (!complaint.adminComments) {
        complaint.adminComments = [];
      }
      complaint.adminComments.push(adminComment);
    }
    
    await complaint.save();

    // Send email notification in background (non-blocking)
    res.json({ msg: "Status updated successfully", complaint });

    // Send email asynchronously
    User.findById(complaint.userId)
      .then(user => {
        if (user) {
          return sendStatusUpdateEmail(user.email, user.name, complaint, status, comment);
        }
      })
      .catch(emailError => {
        console.error('Email sending failed:', emailError.message);
      });

    res.json({ 
      msg: emailSent ? "Status updated and email sent" : "Status updated successfully", 
      complaint 
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Add comment to complaint (Admin only)
exports.addComplaintComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || !comment.trim()) {
      return res.status(400).json({ msg: "Comment is required" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    // Get admin user details
    const adminUser = await User.findById(req.user.userId);
    const adminComment = {
      comment: comment.trim(),
      adminId: req.user.userId,
      adminName: adminUser ? (adminUser.name || adminUser.email) : 'Admin',
      timestamp: new Date()
    };
    
    complaint.adminComments.push(adminComment);
    await complaint.save();

    res.json({ msg: "Comment added successfully", complaint });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });

    if (complaint.userId.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "You can delete only your own complaints" });
    }

    await complaint.remove();
    res.json({ msg: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
