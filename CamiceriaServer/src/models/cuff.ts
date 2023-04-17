import mongoose from "mongoose";

const CuffSchema = new mongoose.Schema({
    name: { type: String, required: true },
})

export const Cuff = mongoose.model("Cuff", CuffSchema);