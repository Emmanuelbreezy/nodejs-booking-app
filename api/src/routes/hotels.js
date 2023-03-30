import express from "express";
import HotelController from "../controllers/hotelController.js";

const router = express.Router();

const hotelController = new HotelController();

/** CREATE HOTEL **/
router.post("/", hotelController.createHotel);

/** UPDATE HOTEL **/
router.put("/:id", hotelController.updateHotel);

/** DELETE HOTEL **/
router.delete("/:id", hotelController.deleteHotel);

/**  SINGLE HOTEL **/
router.get("/:id", hotelController.getSingleHotel);

router.get("/", hotelController.getAllHotel);

export default router;
