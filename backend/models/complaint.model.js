
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Pothole", "Garbage", "Streetlight", "Other"],
    },
    imageUrl: {
      type: String,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    adminComments: [{
      comment: {
        type: String,
        required: true
      },
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      adminName: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
