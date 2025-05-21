const User = require("../models/User");
const Course = require("../models/Course");

// Get all instructors
exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await User.find({ accountType: "Instructor" })
            .populate("additionalDetails", "contactNumber gender dateOfBirth about");

        return res.status(200).json({
            success: true,
            instructors,
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

        if (!instructorId) {
            return res.status(400).json({
                success: false,
                message: "Instructor ID is required",
            });
        }

        const instructor = await User.findById(instructorId);
        if (!instructor || instructor.accountType !== "Instructor") {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        instructor.approved = true;
        await instructor.save();

        return res.status(200).json({
            success: true,
            message: "Instructor approved successfully",
        });
    } catch (error) {
        console.error("Error approving instructor:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to approve instructor",
        });
    }
};
