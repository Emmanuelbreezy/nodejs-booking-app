import express from "express";
import RoomController from "../controllers/roomController.js";

const router = express.Router();

const roomController = new RoomController();

/** CREATE ROOM **/
router.get("/", roomController.createRoom);

export default router;
