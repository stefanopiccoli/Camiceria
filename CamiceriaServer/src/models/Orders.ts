import mongoose, { Schema } from "mongoose";
import { CustomShirtSchema, ICustomShirt } from "./CustomShirt.js";

export interface IOrder {
  _id: string;
  date: Date;
  articles: ICustomShirt[];
  state: "pending" | "paid" | "delivered" | "canceled"
}

export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema(
  {
    _id: {type: String, require: true},
    date: {type: Date},
    articles: {
      customShirts: { type: [CustomShirtSchema] },
    },
    state: {type: String}
  },
  { versionKey: false }
);

export default mongoose.model<IOrderModel>("Order", OrderSchema);