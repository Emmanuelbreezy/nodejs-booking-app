import express from "express";
import HotelController from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

const hotelController = new HotelController();

/** CREATE HOTEL **/
router.post("/", verifyAdmin, hotelController.createHotel);

/** UPDATE HOTEL **/
router.put("/:id", verifyAdmin, hotelController.updateHotel);

/** DELETE HOTEL **/
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);

router.get("/", hotelController.getAllHotel);

/**  SINGLE HOTEL **/
router.get("/find/:id", hotelController.getSingleHotel);

router.get("/countByCity", hotelController.getCountByCity);

router.get("/countByType", hotelController.getCountByType);

export default router;
