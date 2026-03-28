import express from "express";
import { verifyToken } from "../middleware/auth_middleware.js";
import { permit } from "../middleware/role_middleware.js";

import {
  getEventGuests,
  getEventGuestById,
  createEventGuest,
  updateEventGuest,
  deleteEventGuest,
} from "../controllers/event_guests_controller.js";

const router = express.Router();

router.get("/", verifyToken, permit("admin", "collaborator"), getEventGuests);
router.get("/:id", verifyToken, permit("admin", "collaborator"), getEventGuestById);
router.post("/", verifyToken, permit("admin", "collaborator"), createEventGuest);
router.put("/:id", verifyToken, permit("admin", "collaborator"), updateEventGuest);
router.delete("/:id", verifyToken, permit("admin", "collaborator"), deleteEventGuest);

export default router;
