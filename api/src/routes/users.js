import express from "express";
import UserController from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

const userController = new UserController();

/** UPDATE USER **/
router.put("/:id", verifyUser, userController.updateUser);

/** DELETE USER **/
router.delete("/:id", verifyUser, userController.deleteUser);

/**  SINGLE USER **/
router.get("/:id", verifyUser, userController.getSingleUser);

router.get("/", verifyAdmin, userController.getAllUsers);

export default router;
