import mongoose from "mongoose";
import User from "./user.model.js";

const estateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})

const Estate = mongoose.model("Estate", estateSchema);
export default Estate;