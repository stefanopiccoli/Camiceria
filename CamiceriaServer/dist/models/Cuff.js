import mongoose, { Schema } from "mongoose";
export const CuffSchema = new Schema({
    name: { type: String, required: true },
}, { versionKey: false });
export default mongoose.model("Cuff", CuffSchema);
