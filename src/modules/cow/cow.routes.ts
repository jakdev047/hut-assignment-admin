import express from "express";
import {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
} from "./cow.controller";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post("/cows", auth("seller"), createCow);
router.get("/cows", auth("seller", "buyer", Admin_ROLE.ADMIN), getAllCows);
router.get(
  "/cows/:id",
  auth("seller", "buyer", Admin_ROLE.ADMIN),
  getSingleCow
);
router.patch("/cows/:id", auth("seller"), updateCow);
router.delete("/cows/:id", auth("seller"), deleteCow);

export const CowRoutes = router;
