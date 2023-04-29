import mongoose, { Schema } from "mongoose";

export interface IFabric {
  _id: string;
  name: string;
  color?: string;
  imageUrl:string;
}

export interface IFabricModel extends IFabric, Document {}

export const FabricSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    color: {type: [String]},
    imageUrl: { type: String, required: true}

  },
  { versionKey: false }
);

export default mongoose.model<IFabricModel>("Fabric", FabricSchema);

