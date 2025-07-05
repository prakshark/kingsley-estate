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

// CORS configuration for credentials
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173', // Vite dev server
            'http://localhost:3000', // Alternative local port
            'http://localhost:4173', // Vite preview server
            'https://your-frontend-domain.com' // Replace with your actual frontend domain when deployed
        ];
        
        console.log('CORS request from origin:', origin);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('CORS allowed for origin:', origin);
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 200
};

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Additional CORS headers as backup
app.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log('Request origin:', origin);
    console.log('Request method:', req.method);
    
    if (origin) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:4173'
        ];
        
        if (allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
            console.log('Set CORS origin to:', origin);
        }
    }
    
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, X-Requested-With');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

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