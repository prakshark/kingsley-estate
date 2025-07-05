import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function userSignup(req, res) {
    const {name, email, password} = req.body;
    try {
        const userExists = await User.findOne({email: email});
        if(userExists) {
            return res.status(401).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        if(!newUser) {
            return res.status(400).json({message: "Invalid user data"});
        }
        await newUser.save();
        
        // Set authentication cookie after successful signup
        res.cookie('userId', newUser._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({message: "Error creating user", error: error.message});
    }
}

export async function userLogin(req, res) {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({message: "User does not exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).json({message: "Invalid password"});
        }
        
        // Set authentication cookie after successful login
        res.cookie('userId', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        return res.status(200).json({message: "Login successful", user: {id: user._id, name: user.name, email: user.email}});
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({message: "Error logging in", error: error.message});
    }
}

export async function userProfile(req, res) {
    try {
        const userId = req.cookies.userId;
        if(!userId) {
            return res.status(401).json({message: "Not authenticated"});
        }
        
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        return res.status(200).json({id: user._id, name: user.name, email: user.email});
    } catch (error) {
        return res.status(500).json({message: "Error fetching user profile"});
    }
}

export async function userLogout(req, res) {
    try {
        res.clearCookie('userId', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({message: "Error during logout"});
    }
}

export async function userDelete(req, res) {
    try {
        const userId = req.cookies.userId;
        if(!userId) {
            return res.status(401).json({message: "Not authenticated"});
        }
        await User.findByIdAndDelete(userId);
        res.clearCookie('userId');
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error deleting user"});
    }
}