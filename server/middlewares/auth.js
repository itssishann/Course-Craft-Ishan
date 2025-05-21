const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req, res, next) => {
    try{
        //extracting.. 
        const token = req.cookies.token || req.body.token
                     || req.header("Authorization").replace("Bearer ", "");

        //if token is  missing...
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verifying... the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        } catch (error) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    } catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.verifyAdmin = async (req, res, next) => {
    try {
        // Extracting the token (matching the approach in the auth middleware)
        const token = req.cookies.authToken || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log("[verifyAdmin] Received token:", token);
        console.log("[verifyAdmin] JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not loaded");

        // If no token found, return unauthorized
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("[verifyAdmin] Decoded token payload:", decoded);

        // Fetch the user from the database
        const user = await User.findById(decoded.id);
        console.log("[verifyAdmin] Found user:", user);

        // Check if the user is an admin
        if (!user || user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden - Admins only",
            });
        }

        // Attach the user to the request object
        req.user = user;
        next();

    } catch (error) {
        console.error("[verifyAdmin] Admin verification failed:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};