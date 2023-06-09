import mongoose from "mongoose";
import Cuff from "../models/Cuff.js";
const createCuff = (req, res, next) => {
    const { name } = req.body;
    const cuff = new Cuff({
        _id: new mongoose.Types.ObjectId(),
        name,
    });
    return cuff
        .save()
        .then((cuff) => res.status(201).json({ cuff }))
        .catch((error) => res.status(500).json(error));
};
const readCuff = (req, res, next) => {
    const cuffId = req.params.cuffId;
    return Cuff.findById(cuffId)
        .then((cuff) => cuff
        ? res.status(200).json({ cuff })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllCuff = (req, res, next) => {
    return Cuff.find()
        .then((cuffs) => res.status(200).json(cuffs))
        .catch((error) => res.status(500).json({ error }));
};
const updateCuff = (req, res, next) => {
    const cuffId = req.params.cuffId;
    return Cuff.findById(cuffId)
        .then((cuff) => {
        if (cuff) {
            cuff.set(req.body);
            return cuff
                .save()
                .then((cuff) => res.status(201).json({ cuff }))
                .catch((error) => res.status(500).json(error));
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCuff = (req, res, next) => {
    const cuffId = req.params.cuffId;
    return Cuff.findByIdAndDelete(cuffId)
        .then((cuff) => cuff
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
export default {
    createCuff,
    readCuff,
    readAllCuff,
    updateCuff,
    deleteCuff,
};
