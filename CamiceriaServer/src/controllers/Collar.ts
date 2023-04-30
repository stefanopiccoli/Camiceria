import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Collar from "../models/Collar.js";
import { upload } from "../utils/Cloudinary.js";
import { FileArray } from "express-fileupload";

const createCollar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, buttons } = req.body;
  if (!req.files) {
    res.status(500).json({ error: "File not found" });
    return;
  }
  const { file }: FileArray = req.files;
  console.log({ name, buttons, file });
  const { secure_url }: any = await upload(file, "/Camiceria/collar");
  if (!secure_url) {
    res.status(500).json({ secure_url, error: "Error generating secure url" });
    return;
  }
  const collar = new Collar({
    _id: new mongoose.Types.ObjectId(),
    name,
    buttons,
    imageUrl: String(secure_url),
  });

  return collar
    .save()
    .then((collar) => res.status(201).json({ collar }))
    .catch((error) => res.status(500).json(error));
};
const readCollar = (req: Request, res: Response, next: NextFunction) => {
  const collarId = req.params.collarId;

  return Collar.findById(collarId)
    .then((collar) =>
      collar
        ? res.status(200).json({ collar })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAllCollar = (req: Request, res: Response, next: NextFunction) => {
  return Collar.find()
    .then((collars) => res.status(200).json(collars))
    .catch((error) => res.status(500).json({ error }));
};
const updateCollar = (req: Request, res: Response, next: NextFunction) => {
  const collarId = req.params.collarId;

  return Collar.findById(collarId)
    .then((collar) => {
      if (collar) {
        collar.set(req.body);
        return collar
          .save()
          .then((collar) => res.status(201).json({ collar }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteCollar = (req: Request, res: Response, next: NextFunction) => {
  const collarId = req.params.collarId;

  return Collar.findByIdAndDelete(collarId)
    .then((collar) =>
      collar
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createCollar,
  readCollar,
  readAllCollar,
  updateCollar,
  deleteCollar,
};
