// models/InstructorApproval.js

const mongoose = require("mongoose");

const instructorApprovalSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("InstructorApproval", instructorApprovalSchema);
