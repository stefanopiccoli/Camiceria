import mongoose, { Schema } from "mongoose";

export interface ICuff {
    _id: string;
    name: string;
    imageUrl: string;
  }

export interface ICuffModel extends ICuff, Document {}

export const CuffSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true}
  },
  { versionKey: false }
);

export default mongoose.model<ICuffModel>("Cuff", CuffSchema);
