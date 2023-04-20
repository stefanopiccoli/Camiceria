import mongoose, { Schema } from "mongoose";

export interface IFabric {
  _id: string;
  name: string;
  color?: string;
}

export interface IFabricModel extends IFabric, Document {}

export const FabricSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    color: {type: [String]}
  },
  { versionKey: false }
);

export default mongoose.model<IFabricModel>("Fabric", FabricSchema);

