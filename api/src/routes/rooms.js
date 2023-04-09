import express from "express";
import RoomController from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

const roomController = new RoomController();

/** CREATE ROOM **/
router.post("/:hotelId", verifyAdmin, roomController.createRoom);

/** UPDATE ROOM **/
router.put("/:id", verifyAdmin, roomController.updateRoom);

router.put("/availability/:id", verifyAdmin, roomController.updateRoom);

/** DELETE ROOM **/
router.delete("/:id/:hotelId", verifyAdmin, roomController.deleteRoom);

/**  SINGLE ROOM **/
router.get("/:id", roomController.getSingleRoom);

router.get("/", roomController.getAllRoom);

export default router;
