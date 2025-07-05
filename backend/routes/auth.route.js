import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { userSignup, userLogin, userProfile, userLogout, userDelete } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/profile", protectRoute, userProfile);
router.post("/logout", userLogout);
router.post("/delete", protectRoute, userDelete);

export default router;