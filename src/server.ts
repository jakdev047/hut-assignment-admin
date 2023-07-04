import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";
import APIError from "./errorHelpers/APIError";

process.on("uncaught Exception", (err) => {
  throw new APIError(500, "uncaught Exception");
});

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢Database is connected successfully`);

    app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
}
process.on("unhandledRejection", (err) => {
  throw new APIError(500, "Error due to unhandled Rejection");
});
dbConnect();

process.on("SIGTERM", () => {
  throw new APIError(500, "Error due to SIGTERM");
});
