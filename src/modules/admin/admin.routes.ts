import express from "express";
import { createAdmin, loginAdmin } from "./admin.controller";

const router = express.Router();

router.post("/admins/create-admin", createAdmin);
router.post("/admins/login", loginAdmin);

export const adminRoutes = router;
