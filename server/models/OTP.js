const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// Define the OTP Schema
const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m',  // Set expiration to 5 minutes (5m)
    },
    attempts: {
        type: Number,
        default: 0,  // Track the number of OTP attempts
    }
});

// Function to send OTP verification email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "OTP Verification - CourseCraft",
            emailTemplate(otp)
        );
        console.log("Email sent successfully:", mailResponse);
    } catch (error) {
        console.log("Error while sending email:", error);
        throw error;
    }
}

// Middleware to send email when a new OTP document is created
OTPSchema.pre("save", async function(next) {
    // Only send an email when a new OTP document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

// Create the OTP model
const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
