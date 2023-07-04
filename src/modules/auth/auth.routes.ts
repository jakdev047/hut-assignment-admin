import express from "express";
import { createUser, loginUser, getRefreshToken } from "./auth.controller";

const router = express.Router();

router.post("/auth/signup", createUser);
router.post("/auth/login", loginUser);
router.post("/auth/refresh-token", getRefreshToken);
export const authRoutes = router;
