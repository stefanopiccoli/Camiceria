import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Fabric from "../models/Fabric.js";
import { upload } from "../utils/Cloudinary.js";
import { FileArray } from "express-fileupload";

const createFabric = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, color } = req.body;
  if (!req.files) {
    res.status(500).json({ error: "File not found" });
    return;
  }
  const { file }: FileArray = req.files;
  const { secure_url }: any = await upload(file, "/Camiceria/fabric");
  if (!secure_url) {
    res.status(500).json({ secure_url, error: "Error generating secure url" });
    return;
  }
  const fabric = new Fabric({
    _id: new mongoose.Types.ObjectId(),
    name,
    color,
    imageUrl: String(secure_url),
  });

  return fabric
    .save()
    .then((fabric) => res.status(201).json({ fabric }))
    .catch((error) => res.status(500).json(error));
};
const readFabric = (req: Request, res: Response, next: NextFunction) => {
  const fabricId = req.params.fabricId;

  return Fabric.findById(fabricId)
    .then((fabric) =>
      fabric
        ? res.status(200).json({ fabric })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAllFabric = (req: Request, res: Response, next: NextFunction) => {
  return Fabric.find()
    .then((fabrics) => res.status(200).json(fabrics))
    .catch((error) => res.status(500).json({ error }));
};
const updateFabric = (req: Request, res: Response, next: NextFunction) => {
  const fabricId = req.params.fabricId;
  
  return Fabric.findById(fabricId)
    .then((fabric) => {
      if (fabric) {
        fabric.set(req.body);
        return fabric
          .save()
          .then((fabric) => res.status(201).json({ fabric }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteFabric = (req: Request, res: Response, next: NextFunction) => {
  const fabricId = req.params.fabricId;

  return Fabric.findByIdAndDelete(fabricId)
    .then((fabric) =>
      fabric
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createFabric,
  readFabric,
  readAllFabric,
  updateFabric,
  deleteFabric,
};
