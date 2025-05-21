const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/auth");
const adminController = require("../controllers/Admin");

// Protected Admin Routes
router.get("/instructors", verifyAdmin, adminController.getAllInstructors);
router.get("/students", verifyAdmin, adminController.getAllStudents);
router.put("/update-course", verifyAdmin, adminController.updateCourseDetails);
router.get("/stats", verifyAdmin,adminController.getPlatformStats);
router.get("/courses", verifyAdmin, adminController.getAllCourses);
router.delete("/courses/:courseId", verifyAdmin, adminController.deleteCourse);
router.put("/instructors/approve/:instructorId", verifyAdmin, adminController.approveInstructor);

module.exports = router;
