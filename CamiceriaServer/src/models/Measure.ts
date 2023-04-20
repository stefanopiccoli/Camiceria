import mongoose, { Schema } from "mongoose";

export interface IMeasure {
  neck: number,
  shoulder: number,
  chest: number,
  hips: number,
  sleeve: number
}

export interface IMeasureModel extends IMeasure, Document {}

export const MeasureSchema: Schema = new Schema(
  {
    neck: {type: Number, require: true},
    shoulder: {type: Number, require: true},
    chest: {type: Number, require: true},
    hips: {type: Number, require: true},
    sleeve: {type: Number, require: true}
  },
  { versionKey: false }
);

export default mongoose.model<IMeasureModel>("Measure", MeasureSchema);
