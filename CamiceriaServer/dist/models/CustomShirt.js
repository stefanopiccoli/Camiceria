import mongoose, { Schema } from "mongoose";
import { CollarSchema } from "./Collar.js";
import { FabricSchema } from "./Fabric.js";
import { CuffSchema } from "./Cuff.js";
import { SignSchema } from "./Sign.js";
import { MeasureSchema } from "./Measure.js";
export const CustomShirtSchema = new Schema({
    collar: { type: CollarSchema, require: true },
    fabric: { type: FabricSchema, require: true },
    cuff: { type: CuffSchema, require: true },
    sign: { type: SignSchema, require: true },
    measure: { type: MeasureSchema, require: true }
}, { versionKey: false });
export default mongoose.model("CustomShirt", CustomShirtSchema);
