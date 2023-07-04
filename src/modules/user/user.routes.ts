import express from "express";
import {
  deleteUser,
  getAllUser,
  getProfile,
  getSingleUser,
  updateUser,
  updateUserProfile,
} from "./user.controller";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.get("/users", auth(Admin_ROLE.ADMIN), getAllUser);
router.get("/users/my-profile", auth("seller", "buyer"), getProfile);
router.patch("/users/my-profile", auth("seller", "buyer"), updateUserProfile);
router.get("/users/:id", auth(Admin_ROLE.ADMIN), getSingleUser);
router.patch("/users/:id", auth(Admin_ROLE.ADMIN), updateUser);
router.delete("/users/:id", auth(Admin_ROLE.ADMIN), deleteUser);

export const UserRoutes = router;
