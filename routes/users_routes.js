import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users_controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

// router.post("/", verifyToken, permit("admin","collaborator"), createEvent);
// router.put("/:id", verifyToken, permit("admin","collaborator"), updateEvent);
// router.delete("/:id", verifyToken, permit("admin"), deleteEvent);
