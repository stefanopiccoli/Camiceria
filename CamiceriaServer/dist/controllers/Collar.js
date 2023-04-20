import mongoose from "mongoose";
import Collar from "../models/Collar.js";
const createCollar = (req, res, next) => {
    const { name } = req.body;
    const collar = new Collar({
        _id: new mongoose.Types.ObjectId(),
        name,
    });
    return collar
        .save()
        .then((collar) => res.status(201).json({ collar }))
        .catch((error) => res.status(500).json(error));
};
const readCollar = (req, res, next) => {
    const collarId = req.params.collarId;
    return Collar.findById(collarId)
        .then((collar) => collar
        ? res.status(200).json({ collar })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllCollar = (req, res, next) => {
    return Collar.find()
        .then((collars) => res.status(200).json(collars))
        .catch((error) => res.status(500).json({ error }));
};
const updateCollar = (req, res, next) => {
    const collarId = req.params.collarId;
    return Collar.findById(collarId)
        .then((collar) => {
        if (collar) {
            collar.set(req.body);
            return collar
                .save()
                .then((collar) => res.status(201).json({ collar }))
                .catch((error) => res.status(500).json(error));
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCollar = (req, res, next) => {
    const collarId = req.params.collarId;
    return Collar.findByIdAndDelete(collarId)
        .then((collar) => collar
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
export default {
    createCollar,
    readCollar,
    readAllCollar,
    updateCollar,
    deleteCollar,
};
