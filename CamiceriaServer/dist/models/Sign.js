import mongoose, { Schema } from "mongoose";
export const SignSchema = new Schema({
    do: { type: Boolean, required: true },
    text: { type: String, required: true },
    font: { type: String }
}, { versionKey: false });
export default mongoose.model("Sign", SignSchema);
