import Estate from "../models/estate.model.js";
import mongoose from "mongoose";

export async function createEstate(req, res) {
    const {name, location, price, image} = req.body;
    const ownerId = req.cookies.userId;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
        return res.status(503).json({message: "Database connection not available"});
    }
    
    if(!ownerId) {
        return res.status(401).json({message: "Owner not authenticated"});
    }
    try {
        const newEstate = new Estate({
            name: name,
            location: location,
            price: price,
            image: image,
            ownerId: ownerId
        })
        await newEstate.save();
        return res.status(201).json({message: "Estate created successfully", estate: newEstate});
    } catch (error) {
        console.error('Create estate error:', error);
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            return res.status(503).json({message: "Database connection error", error: "Please try again later"});
        }
        return res.status(500).json({message: "Error creating estate"});
    }
}

export async function getEstate(req, res) {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
        return res.status(503).json({message: "Database connection not available"});
    }
    
    try {
        const estateId = req.params.id;
        const estate = await Estate.findOne({_id: estateId});
        if(!estateId) {
            return res.status(404).json({message: "Estate not found"});
        }
        return res.status(200).json({estate: estate});
    } catch (error) {
        console.error('Get estate error:', error);
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            return res.status(503).json({message: "Database connection error", error: "Please try again later"});
        }
        return res.status(500).json({message: "Error fetching estate"});
    }
}

export async function updateEstate(req, res) {
    const estateId = req.params.id;
    const {name, location, price, image} = req.body;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
        return res.status(503).json({message: "Database connection not available"});
    }
    
    try {
        const estate = await Estate.findById(estateId);
        if(estate.ownerId !== req.user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to update this estate"});
        }
        await Estate.findByIdAndUpdate(estateId, {name, location, price, image}, {new: true});
        if(!estate) {
            return res.status(404).json({message: "Estate not found"});
        }
        return res.status(200).json({message: "Estate updated successfully", estate: estate});
    } catch (error) {
        console.error('Update estate error:', error);
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            return res.status(503).json({message: "Database connection error", error: "Please try again later"});
        }
        return res.status(500).json({message: "Error updating estate"});
    }
}

export async function getAllEstates(req, res) {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
        return res.status(503).json({message: "Database connection not available"});
    }
    
    try {
        const estates = await Estate.find();
        return res.status(200).json({estates: estates});
    } catch (error) {
        console.error('Get all estates error:', error);
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            return res.status(503).json({message: "Database connection error", error: "Please try again later"});
        }
        return res.status(500).json({
            message: error.message,
            error: "Error fetching estates"
        });
    }
}

export async function deleteEstate(req, res) {
    const estateId = req.params.id;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
        return res.status(503).json({message: "Database connection not available"});
    }
    
    try {
        const estate = await Estate.findById(estateId);
        if(estate.ownerId !== req.user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to delete this estate"});
        }
        if(!estate) {
            return res.status(404).json({message: "Estate not found"});
        }
        return res.status(200).json({message: "Estate deleted successfully"});
    } catch (error) {
        console.error('Delete estate error:', error);
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            return res.status(503).json({message: "Database connection error", error: "Please try again later"});
        }
        return res.status(500).json({message: "Error deleting estate"});
    }
}