import mongoose, { Schema } from "mongoose";
import { CollarSchema, ICollar } from "./Collar";
import Fabric, { FabricSchema, IFabric } from "./Fabric";
import Cuff, { CuffSchema, ICuff } from "./Cuff";
import Sign, { ISign, SignSchema } from "./Sign";
import Measure, { IMeasure, MeasureSchema } from "./Measure";



export interface ICustomShirt{
  _id?: string,
  collar:ICollar,
  fabric:IFabric,
  cuff:ICuff,
  sign:ISign,
  measure:IMeasure
}

export interface ICustomShirtModel extends ICustomShirt, Document {}

export const CustomShirtSchema: Schema = new Schema(
  {
    collar: {type: CollarSchema, require:true},
    fabric: {type: FabricSchema, require:true},
    cuff: {type: CuffSchema, require:true},
    sign: {type: SignSchema, require:true},
    measure: {type: MeasureSchema, require:true}
  },
  { versionKey: false }
);

export default mongoose.model<ICustomShirtModel>("CustomShirt", CustomShirtSchema);
