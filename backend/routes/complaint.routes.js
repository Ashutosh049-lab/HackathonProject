
// const express = require("express");
// const {
//   createComplaint,
//   getMyComplaints,
//   getComplaintById,
//   updateComplaintStatus,
//   deleteComplaint,
// } = require("../controllers/complaint.controller");

// const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");

// const router = express.Router();

// // User routes
// router.post("/", authMiddleware, createComplaint);
// router.get("/", authMiddleware, getMyComplaints);
// router.get("/:id", authMiddleware, getComplaintById);
// router.delete("/:id", authMiddleware, deleteComplaint);

// // Admin route → update status
// router.patch("/:id/status", authMiddleware, adminMiddleware, updateComplaintStatus);

// module.exports = router;




// const express = require("express");
// const {
//   createComplaint,
//   getMyComplaints,
//   getComplaintById,
//   updateComplaintStatus,
//   deleteComplaint,
// } = require("../controllers/complaint.controller");

// const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");
// const upload = require("../middlewares/upload.middleware"); // <-- Multer

// const router = express.Router();

// // User routes
// router.post("/", authMiddleware, upload.single("image"), createComplaint); // <-- add upload.single("image")
// router.get("/", authMiddleware, getMyComplaints);
// router.get("/:id", authMiddleware, getComplaintById);
// router.delete("/:id", authMiddleware, deleteComplaint);

// // Admin route → update status
// router.patch("/:id/status", authMiddleware, adminMiddleware, updateComplaintStatus);

// module.exports = router;







// const express = require("express");
// const {
//   createComplaint,
//   getMyComplaints,
//   getComplaintById,
//   updateComplaintStatus,
//   deleteComplaint,
// } = require("../controllers/complaint.controller");

// const { authMiddleware } = require("../middlewares/auth.middleware");
// const { adminMiddleware } = require("../middlewares/role.middleware"); // <-- Admin middleware
// const upload = require("../middlewares/upload.middleware"); // <-- Multer for file upload

// const router = express.Router();

// // User routes
// router.post("/", authMiddleware, upload.single("image"), createComplaint);
// router.get("/", authMiddleware, getMyComplaints);
// router.get("/:id", authMiddleware, getComplaintById);
// router.delete("/:id", authMiddleware, deleteComplaint);

// // Admin route → update complaint status
// router.patch("/:id/status", authMiddleware, adminMiddleware, updateComplaintStatus);

// module.exports = router;







const express = require("express");
const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaint.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

// Create complaint
router.post("/", authMiddleware, upload.single("image"), createComplaint);

// Get complaints of logged-in user only
router.get("/my-complaints", authMiddleware, getMyComplaints);

// Get all complaints (for both users & admins)
router.get("/", authMiddleware, getAllComplaints);

// Get complaint by ID
router.get("/:id", authMiddleware, getComplaintById);

// Delete complaint (only by owner)
router.delete("/:id", authMiddleware, deleteComplaint);

// Admin route → update complaint status
router.patch("/:id/status", authMiddleware, adminMiddleware, updateComplaintStatus);

module.exports = router;
