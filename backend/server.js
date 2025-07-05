import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import estateRoutes from "./routes/estate.route.js";
import mongoose from "mongoose";

try {
    dotenv.config();
    console.log("Dotenv configured");
} catch (error) {
    console.log("Dotenv error (this is normal if no .env file):", error.message);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/estate", estateRoutes);

// API Health Endpoint :-
app.get("/", (req, res) => {
    res.json({health: "Backend Working Fine"})
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        if (!process.env.MONGO_URI) {
            console.log("MONGO_URI not found in environment variables");
            return;
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
})