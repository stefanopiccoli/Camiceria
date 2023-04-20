import mongoose, { Schema } from "mongoose";

export interface ISign {
    do: boolean | "unselected";
    text: string;
    font?: "italic" | "capitalized";
  }

export interface ISignModel extends ISign, Document {}

export const SignSchema: Schema = new Schema(
  {
    do: { type: Boolean, required: true },
    text: { type: String, required:true},
    font: { type: String}
  },
  { versionKey: false }
);

export default mongoose.model<ISignModel>("Sign", SignSchema);
