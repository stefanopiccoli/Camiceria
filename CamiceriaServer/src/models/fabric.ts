import mongoose from "mongoose";

const FabricSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: Array<String> }
})

export const Fabric = mongoose.model("Fabric", FabricSchema);