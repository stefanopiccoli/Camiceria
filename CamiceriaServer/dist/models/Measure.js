import mongoose, { Schema } from "mongoose";
export const MeasureSchema = new Schema({
    neck: { type: Number, require: true },
    shoulder: { type: Number, require: true },
    chest: { type: Number, require: true },
    hips: { type: Number, require: true },
    sleeve: { type: Number, require: true }
}, { versionKey: false });
export default mongoose.model("Measure", MeasureSchema);
