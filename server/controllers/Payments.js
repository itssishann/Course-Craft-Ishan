const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress");

// Capture payment order creation
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide course IDs" });
    }

    let totalAmount = 0;

    for (const courseId of courses) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: `Already enrolled in course: ${course.courseName}`,
                });
            }

            totalAmount += course.price;
        } catch (error) {
            console.error("Error during course validation:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    const options = {
        amount: totalAmount * 100, // INR -> paise
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ success: false, message: "Could not initiate payment" });
    }
};

// Verify Razorpay payment signature
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Missing payment verification details" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId);
        return res.status(200).json({ success: true, message: "Payment verified, enrollment successful" });
    } else {
        return res.status(400).json({ success: false, message: "Payment verification failed. Invalid signature." });
    }
};

// Enroll student in courses + send email
const enrollStudents = async (courses, userId) => {
    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                console.warn(`Course not found for enrollment: ${courseId}`);
                continue;
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId,
                completedVideos: [],
            });

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            if (enrolledStudent?.email) {
                await mailSender(
                    enrolledStudent.email,
                    `Enrolled in ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(
                        enrolledCourse.courseName,
                        enrolledStudent.firstName || "Student"
                    )
                );
            } else {
                console.warn("Enrollment email not sent: No email found for user", userId);
            }
        } catch (error) {
            console.error(`Error enrolling student in course ${courseId}:`, error);
        }
    }
};

// Send payment success confirmation email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Missing payment email details" });
    }

    try {
        const user = await User.findById(userId);

        if (!user?.email) {
            return res.status(404).json({ success: false, message: "User email not found" });
        }

        await mailSender(
            user.email,
            "Payment Received - CourseCraft",
            paymentSuccessEmail(
                user.firstName || "Student",
                amount / 100, // convert back from paise
                orderId,
                paymentId
            )
        );
        await mailSender(
            user.email,
            `Enrolled in ${user.courseName || "n/a"}`,
            courseEnrollmentEmail(
                enrolledCourse.courseName || "n/a",
                user.firstName || "Student"
            )
        );

        return res.status(200).json({ success: true, message: "Payment confirmation email sent" });
    } catch (error) {
        console.error("Error sending payment success email:", error);
        return res.status(500).json({ success: false, message: "Failed to send payment email" });
    }
};
