import express from "express";
import {verifyToken} from "../middleware/auth_middleware.js";
import {permit} from "../middleware/role_middleware.js";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events_controller.js";

const router = express.Router();

router.get("/", verifyToken,permit("admin","collaborator"),getEvents);
router.get("/:id",verifyToken,permit("admin","collaborator"), getEventById);
router.post("/", verifyToken,permit("admin"), createEvent);
router.put("/:id", verifyToken,permit("admin"), updateEvent);
router.delete("/:id", verifyToken,permit("admin"), deleteEvent);

export default router;
