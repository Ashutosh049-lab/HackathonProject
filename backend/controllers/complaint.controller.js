
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
const nodemailer = require("nodemailer");
const User = require("../models/user.model");

// Create Complaint with Cloudinary image upload
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const parsedLocation = typeof location === "string" ? JSON.parse(location) : location;

    let imageUrl = null;
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "complaints" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const complaint = await Complaint.create({
      userId,
      title,
      description,
      category,
      imageUrl,
      location: parsedLocation,
    });

    res.status(201).json({ msg: "Complaint submitted", complaint });
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
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    complaint.status = status;
    await complaint.save();

    // Send email notification to user
    const user = await User.findById(complaint.userId);
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Update on your complaint: ${complaint.title}`,
        text: `Hello ${user.name},\n\nYour complaint "${complaint.title}" status has been updated to: ${status}.\n\nThank you for reporting!`,
      });
    }

    res.json({ msg: "Status updated and email sent", complaint });
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
