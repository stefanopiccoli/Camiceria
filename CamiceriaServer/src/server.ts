import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import collarRoutes from "./routes/Collar.js";
import fabricRoutes from "./routes/Fabric.js";
import cuffRoutes from "./routes/Cuff.js";
import userRoutes from "./routes/User.js";
import { CLOUDINARY_CONFIG, config } from "./config/config.js";
import { decodeToken } from "./middlewares/Auth.js";

const app = express();
export const cloud = cloudinary.v2;
cloud.config(CLOUDINARY_CONFIG);

//CONNECT TO MONGO

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB");
    StartServer();
  })
  .catch((error) => {
    console.log("Unable to connect: ");
    console.log(error);
  });

const StartServer = () => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true , limit:'25mb'}));
  app.use(express.json({limit:'25mb'}));
  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );

  // Routes
  app.use("/api/collars", collarRoutes);
  app.use("/api/fabrics", fabricRoutes);
  app.use("/api/cuffs", cuffRoutes);
  app.use("/api/users", userRoutes);

  // Healthcheck
  app.get("/ping", (req, res) => res.status(200).json({ message: "pong" }));

  // Error handling
  app.use((req, res) => {
    const error = new Error("not found");
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(app)
    .listen(config.server.port, () =>
      console.log(`Server is running on port ${config.server.port}`)
    );
};
