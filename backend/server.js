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
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://kingsley-estate-frontend.onrender.com';
console.log('CORS Origin:', FRONTEND_URL);

// More explicit CORS configuration
app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  console.log('Request method:', req.method);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    res.status(200).end();
    return;
  }
  
  // Handle actual requests
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  
  next();
});

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