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

// CORS configuration for cross-origin cookies
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://kingsley-estate-frontend.onrender.com'; // Remove trailing slash
console.log('CORS Origin:', FRONTEND_URL); // Debug log
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/estate", estateRoutes);

// API Health Endpoint with MongoDB status
app.get("/", (req, res) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.json({
        health: "Backend Working Fine",
        mongodb: mongoStatus,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;


// MongoDB Connection with better error handling
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI not found in environment variables");
            process.exit(1);
        }
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 1, // Minimum number of connections in the pool
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing server and MongoDB connection...');
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Closing server and MongoDB connection...');
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});

// Start server only after MongoDB connection
const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();