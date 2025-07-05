import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
    const userId = req.cookies.userId;
    if(!userId) {
        return res.status(401).json({message: "Not authenticated through middleware"});
    }
    const user = await User.findById(userId);
    if(!user) {
        return res.status(401).json({message: "User not found through middleware"});
    }
    req.user = user;
    next();
}