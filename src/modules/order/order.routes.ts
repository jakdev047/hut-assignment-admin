import express from "express";
import { createOrder, getAllOrders, singleOrder } from "./order.controller";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post("/orders", auth("buyer"), createOrder);
router.get("/orders", auth("seller", "buyer", Admin_ROLE.ADMIN), getAllOrders);
router.get(
  "/orders/:id",
  auth("seller", "buyer", Admin_ROLE.ADMIN),
  singleOrder
);
export const orderRoutes = router;
