import mongoose from "mongoose";

export const FabricSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: Array<String> }
})

export const Fabric = mongoose.model("Fabric", FabricSchema);