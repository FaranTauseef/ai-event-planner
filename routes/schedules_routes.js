import express from "express";
import {
  getSchedules,
  getScheduleById,
  getScheduleByEventId,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedules_controller.js";

import {verifyToken} from "../middleware/auth_middleware.js";
import {permit} from "../middleware/role_middleware.js";

const router = express.Router();



router.get("/", verifyToken,permit("admin","collaborator"),getSchedules);
router.get("/event",verifyToken,permit("admin","collaborator"), getScheduleByEventId); 
router.get("/:id",verifyToken,permit("admin","collaborator"), getScheduleById);
router.post("/", verifyToken,permit("admin"),createSchedule);
router.put("/:id", verifyToken,permit("admin"),updateSchedule);
router.delete("/:id", verifyToken,permit("admin"),deleteSchedule);
export default router;