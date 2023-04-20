import mongoose, { Schema } from "mongoose";

export interface ICollar {
  _id: string;
  name: string;
  buttons?: 1 | 2;
}

export interface ICollarModel extends ICollar, Document {}

export const CollarSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    buttons: { type: Number, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<ICollarModel>("Collar", CollarSchema);
