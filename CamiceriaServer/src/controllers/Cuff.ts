import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Cuff from "../models/Cuff.js";
import { upload } from "../utils/Cloudinary.js";
import { FileArray } from "express-fileupload";

const createCuff = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!req.files) {
    res.status(500).json({ error: "File not found" });
    return;
  }
  const { file }: FileArray = req.files;
  const { secure_url }: any = await upload(file, "/Camiceria/cuff");
  if (!secure_url) {
    res.status(500).json({ secure_url, error: "Error generating secure url" });
    return;
  }
  const cuff = new Cuff({
    _id: new mongoose.Types.ObjectId(),
    name,
    imageUrl: String(secure_url),
  });

  return cuff
    .save()
    .then((cuff) => res.status(201).json({ cuff }))
    .catch((error) => res.status(500).json(error));
};
const readCuff = (req: Request, res: Response, next: NextFunction) => {
  const cuffId = req.params.cuffId;

  return Cuff.findById(cuffId)
    .then((cuff) =>
      cuff
        ? res.status(200).json({ cuff })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAllCuff = (req: Request, res: Response, next: NextFunction) => {
  return Cuff.find()
    .then((cuffs) => res.status(200).json(cuffs))
    .catch((error) => res.status(500).json({ error }));
};
const updateCuff = (req: Request, res: Response, next: NextFunction) => {
  const cuffId = req.params.cuffId;
  
  return Cuff.findById(cuffId)
    .then((cuff) => {
      if (cuff) {
        cuff.set(req.body);
        return cuff
          .save()
          .then((cuff) => res.status(201).json({ cuff }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteCuff = (req: Request, res: Response, next: NextFunction) => {
  const cuffId = req.params.cuffId;

  return Cuff.findByIdAndDelete(cuffId)
    .then((cuff) =>
      cuff
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createCuff,
  readCuff,
  readAllCuff,
  updateCuff,
  deleteCuff,
};
