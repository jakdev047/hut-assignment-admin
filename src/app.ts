import express, { Application } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/user/user.routes";
import { globalErrorHandler } from "./middlewears/globalErrorHandler";
import { CowRoutes } from "./modules/cow/cow.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { orderRoutes } from "./modules/order/order.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", UserRoutes);
app.use("/api/v1", CowRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", adminRoutes);

// error handler
app.use(globalErrorHandler);

export default app;
