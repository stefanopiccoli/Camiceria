import mongoose from "mongoose";

const CollarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    buttons: { type: Number, required:true}
})

export const Collar = mongoose.model("Collar", CollarSchema);




