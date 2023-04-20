import mongoose, { Schema } from "mongoose";
export const FabricSchema = new Schema({
    name: { type: String, required: true },
    color: { type: [String] }
}, { versionKey: false });
export default mongoose.model("Fabric", FabricSchema);
