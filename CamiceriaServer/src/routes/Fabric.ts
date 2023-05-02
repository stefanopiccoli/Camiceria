import express from "express";
import controller from "../controllers/Fabric.js";
import { adminCheck, decodeToken } from "../middlewares/Auth.js";

const router = express.Router();

router.get("/get/:fabricId", controller.readFabric);
router.get("/get/", controller.readAllFabric);
router.use(decodeToken);
router.use(adminCheck);
router.post("/create", controller.createFabric);
router.patch("/update/:fabricId", controller.updateFabric);
router.delete("/delete/:fabricId", controller.deleteFabric);

export default router;
