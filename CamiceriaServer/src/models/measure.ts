import mongoose from "mongoose";

export const MeasureSchema = new mongoose.Schema({
  neck: {type: Number, require: true},
  shoulder: {type: Number, require: true},
  chest: {type: Number, require: true},
  hips: {type: Number, require: true},
  sleeve: {type: Number, require: true}
})

export const Measure = mongoose.model("Measure", MeasureSchema);

export interface Measure {
  neck: number,
  shoulder: number,
  chest: number,
  hips: number,
  sleeve: number
}