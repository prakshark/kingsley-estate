import User from "../models/user.model.js";
import mongoose from "mongoose";

export async function protectRoute(req, res, next) {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
        return res.status(503).json({message: "Database connection not available"});
    }
    
    const userId = req.cookies.userId;
    if(!userId) {
        return res.status(401).json({message: "Not authenticated through middleware"});
    }
    
    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({message: "User not found through middleware"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Protect route error:', error);
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            return res.status(503).json({message: "Database connection error", error: "Please try again later"});
        }
        return res.status(500).json({message: "Authentication error"});
    }
}