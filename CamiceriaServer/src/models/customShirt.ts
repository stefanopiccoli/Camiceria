import mongoose from "mongoose";
import { CollarSchema } from "./collar.js";
import { FabricSchema } from "./fabric.js";
import { CuffSchema } from "./cuff.js";
import { SignSchema } from "./sign.js";
import { MeasureSchema } from "./measure.js";

export const CustomShirtSchema = new mongoose.Schema({
  _id: { type: String },
  collar: { type: CollarSchema },
  fabric: { type: FabricSchema },
  cuff: { type: CuffSchema },
  sign: { type: SignSchema },
  measure: { type: MeasureSchema },
})

export const CustomShirt = mongoose.model("CustomShirt", CustomShirtSchema);