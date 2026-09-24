import express from "express";
import {signup, login, forgotPassword, resetPassword} from "../controllers/authController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
    "/signup",
    upload.fields([
        { name: "cnic_front", maxCount: 1 },
        { name: "cnic_back", maxCount: 1 }
    ]),
    signup
);

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;