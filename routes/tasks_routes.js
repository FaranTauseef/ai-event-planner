import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks_controller.js";
import {verifyToken} from "../middleware/auth_middleware.js";
import {permit} from "../middleware/role_middleware.js";

const router = express.Router();

router.get("/", verifyToken,permit("admin","collaborator"), getTasks);
router.get("/:id",  verifyToken,permit("admin","collaborator"),getTaskById);
router.post("/", verifyToken,permit("admin"), createTask);
router.put("/:id", verifyToken,permit("admin"), updateTask);
router.delete("/:id", verifyToken,permit("admin"), deleteTask);

export default router;