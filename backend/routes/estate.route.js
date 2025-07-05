import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createEstate, getEstate, updateEstate, deleteEstate, getAllEstates } from "../controllers/estate.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createEstate);
router.get("/getAllEstates", getAllEstates);
router.get("/:id", getEstate);
router.put("/:id", protectRoute, updateEstate);
router.delete("/:id", protectRoute, deleteEstate);

export default router;