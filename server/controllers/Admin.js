const User = require("../models/User");
const Course = require("../models/Course");
const InstructorApproval = require("../models/InstructorApproval")
// Get all instructors

exports.getAllInstructors = async (req, res) => {
  try {
    // Get all instructors
    const instructors = await User.find({ accountType: "Instructor" })
      .populate("additionalDetails", "contactNumber gender dateOfBirth about");

    // Get all approval records for these instructors
    const approvals = await InstructorApproval.find({
      instructorId: { $in: instructors.map(i => i._id) }
    });

    // Make a simple object to find if an instructor is approved or not
    const approvalStatus = {};
    approvals.forEach(item => {
      approvalStatus[item.instructorId.toString()] = item.approved;
    });

    // Separate approved and pending instructors
    const approvedInstructors = [];
    const pendingInstructors = [];

    instructors.forEach(instructor => {
      if (approvalStatus[instructor._id.toString()]) {
        approvedInstructors.push(instructor);
      } else {
        pendingInstructors.push(instructor);
      }
    });

    // Send response with both lists
    return res.status(200).json({
      success: true,
      approvedInstructors,
      pendingInstructors,
    });
  } catch (error) {
    console.error("Error fetching instructors:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructors",
    });
  }
};


// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ accountType: "Student" })
            .populate("additionalDetails", "contactNumber gender dateOfBirth about");

        return res.status(200).json({
            success: true,
            students,
        });
    } catch (error) {
        console.error("Error fetching students:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch students",
        });
    }
};

// Update Course Details (Name and Price)
exports.updateCourseDetails = async (req, res) => {
    try {
        const { courseId, name, price } = req.body;

        if (!courseId || !name || price == null) {
            return res.status(400).json({
                success: false,
                message: "Course ID, name, and price are required",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        course.name = name;
        course.price = price;
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course,
        });
    } catch (error) {
        console.error("Error updating course:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
        });
    }
};

// Get Platform Stats
exports.getPlatformStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ accountType: "Student" });
    const totalInstructors = await User.countDocuments({ accountType: "Instructor" });
    const totalCourses = await Course.countDocuments({});
    const totalEarnings = await Course.aggregate([
  {
    $project: {
      revenue: { $multiply: ["$price", { $size: "$studentsEnrolled" }] },
    },
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$revenue" },
    },
  },
]);


    const recentInstructors = await User.find({ accountType: "Instructor" })
      .select("firstName email image createdAt") // exclude password
      .sort({ createdAt: -1 })
      .limit(5);

    const recentStudents = await User.find({ accountType: "Student" })
      .select("firstName email image createdAt") // select only safe fields
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalInstructors,
          totalCourses,
          totalRevenue: totalEarnings[0]?.total || 0,
        },
        recentInstructors,
        recentStudents,
      },
    });
  } catch (error) {
    console.error("Error fetching platform stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch platform stats",
    });
  }
};


// Get all courses with instructor and student details
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
            .populate("instructor", "firstName lastName email")
            .populate("studentsEnrolled", "firstName lastName email");

        return res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
        });
    }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting course:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
        });
    }
};

// Approve Instructor Account

exports.approveInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;

    // Validate instructor exists and is an Instructor
    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.accountType !== "Instructor") {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // Check if instructor is already approved
    const existingApproval = await InstructorApproval.findOne({ instructorId });

    if (existingApproval?.approved) {
      return res.status(200).json({
        success: true,
        message: "Instructor is already approved",
        data: existingApproval,
      });
    }

    // Approve instructor (insert or update)
    const approval = await InstructorApproval.findOneAndUpdate(
      { instructorId },
      { approved: true },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Instructor approved successfully",
      data: approval,
    });
  } catch (error) {
    console.error("❌ Error approving instructor:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to approve instructor",
    });
  }
};

