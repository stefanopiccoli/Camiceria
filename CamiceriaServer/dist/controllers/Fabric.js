import mongoose from "mongoose";
import Fabric from "../models/Fabric.js";
const createFabric = (req, res, next) => {
    const { name, color } = req.body;
    const fabric = new Fabric({
        _id: new mongoose.Types.ObjectId(),
        name,
        color,
    });
    return fabric
        .save()
        .then((fabric) => res.status(201).json({ fabric }))
        .catch((error) => res.status(500).json(error));
};
const readFabric = (req, res, next) => {
    const fabricId = req.params.fabricId;
    return Fabric.findById(fabricId)
        .then((fabric) => fabric
        ? res.status(200).json({ fabric })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllFabric = (req, res, next) => {
    return Fabric.find()
        .then((fabrics) => res.status(200).json(fabrics))
        .catch((error) => res.status(500).json({ error }));
};
const updateFabric = (req, res, next) => {
    const fabricId = req.params.fabricId;
    return Fabric.findById(fabricId)
        .then((fabric) => {
        if (fabric) {
            fabric.set(req.body);
            return fabric
                .save()
                .then((fabric) => res.status(201).json({ fabric }))
                .catch((error) => res.status(500).json(error));
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteFabric = (req, res, next) => {
    const fabricId = req.params.fabricId;
    return Fabric.findByIdAndDelete(fabricId)
        .then((fabric) => fabric
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
export default {
    createFabric,
    readFabric,
    readAllFabric,
    updateFabric,
    deleteFabric,
};
