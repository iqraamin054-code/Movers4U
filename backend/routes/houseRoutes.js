import express from "express";
import {
  createHouse,
  getApprovedHouses,
  getSingleHouse,
  getSellerHouses,
  getPendingHouses,
  approveHouse,
  rejectHouse,
  buyHouse,
  getAllHouses,
  getHousesByStatus,
  updateHouseStatus
} from "../controllers/houseController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadHouseImages.js";

const router = express.Router();


// ===================== ADMIN =====================

// GET ALL HOUSES (ADMIN)
router.get("/", authMiddleware, getAllHouses);

// UPDATE STATUS (ADMIN)
router.put("/:id/status", authMiddleware, updateHouseStatus);

// PENDING
router.get("/pending", authMiddleware, getPendingHouses);

// APPROVE / REJECT
router.put("/approve/:id", authMiddleware, approveHouse);
router.put("/reject/:id", authMiddleware, rejectHouse);

// FILTER BY STATUS
router.get("/status/:status", authMiddleware, getHousesByStatus);


// ===================== SELLER =====================

// CREATE HOUSE
router.post(
  "/create",
  authMiddleware,
  upload.array("images", 5),
  createHouse
);

// SELLER OWN HOUSES
router.get("/seller-houses", authMiddleware, getSellerHouses);


// ===================== BUYER =====================

// APPROVED HOUSES (PUBLIC)
router.get("/approved", getApprovedHouses);

// BUY HOUSE
router.post("/buy/:id", authMiddleware, buyHouse);


// ===================== SINGLE HOUSE (MUST BE LAST) =====================

router.get("/:id", getSingleHouse);

export default router;