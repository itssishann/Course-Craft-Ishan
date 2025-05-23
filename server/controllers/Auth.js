const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
const InstructorApproval = require("../models/InstructorApproval");
// OTP verification by SENDING OTP
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already present
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // Generate OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP GENERATED => ", otp);

        // Checking uniqueness of OTP
        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
        }

        // Creating OTP payload
        const otpPayload = { email, otp };
        // Creating an entry in Database for OTP
        await OTP.create(otpPayload);
        console.log("OTP sent successfully!");

        // Sending final response
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Signup

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).send({ success: false, message: "All Fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (!response.length || response[0].otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${firstName}%20${lastName}`,
    });

    // Add instructor to approval list
    if (accountType === "Instructor") {
      await InstructorApproval.create({ instructorId: user._id });
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};


// Login
// In your login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not registered" });
    }

    // ⛔ Block instructor login if not approved
    if (user.accountType === "Instructor") {
      const approval = await InstructorApproval.findOne({ instructorId : user._id });
      if (!approval || !approval.approved) {
        return res.status(403).json({
          success: false,
          message: "Instructor not approved yet",
        });
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Password mismatch" });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};


// Change Password
exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (
            req.user.id === "65e5f42e80d7655121be02c0" ||
            (userDetails?.email && userDetails.email === "usethis1470@gmail.com")
        ) {
            return res.status(401).json({
                success: false,
                message: "Test account's password is not editable",
            });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Check if old password matches
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true });

        // Send email - Password updated
        try {
            const emailResponse = await mailSender(
                userDetails.email,
                `Password updated successfully for ${userDetails.firstName} ${userDetails.lastName}`,
                passwordUpdated(userDetails.email, `${userDetails.firstName} ${userDetails.lastName}`)
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};
