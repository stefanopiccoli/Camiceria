import mongoose from "mongoose";

export const SignSchema = new mongoose.Schema({
    do: { type: Boolean, required: true },
    text: { type: String, required:true},
    font: { type: String}
})

export const Sign = mongoose.model("Sign", SignSchema);
