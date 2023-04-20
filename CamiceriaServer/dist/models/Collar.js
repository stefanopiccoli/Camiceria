import mongoose, { Schema } from "mongoose";
export const CollarSchema = new Schema({
    name: { type: String, required: true },
    buttons: { type: Number, required: true },
}, { versionKey: false });
export default mongoose.model("Collar", CollarSchema);
