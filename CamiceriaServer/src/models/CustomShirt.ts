import mongoose, { Schema } from "mongoose";
import { CollarSchema, ICollar } from "./Collar.js";
import Fabric, { FabricSchema, IFabric } from "./Fabric.js";
import Cuff, { CuffSchema, ICuff } from "./Cuff.js";
import Sign, { ISign, SignSchema } from "./Sign.js";
import Measure, { IMeasure, MeasureSchema } from "./Measure.js";



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
