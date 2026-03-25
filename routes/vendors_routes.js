import express from "express";
import {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../controllers/vendors_controller.js";
import {verifyToken} from "../middleware/auth_middleware.js";
import {permit} from "../middleware/role_middleware.js";

const router = express.Router();

router.get("/",verifyToken,permit("admin","collaborator"), getVendors);
router.get("/:id",verifyToken,permit("admin","collaborator"), getVendorById);
router.post("/", verifyToken,permit("admin"), createVendor);
router.put("/:id", verifyToken,permit("admin"), updateVendor);
router.delete("/:id", verifyToken,permit("admin"), deleteVendor);
export default router;