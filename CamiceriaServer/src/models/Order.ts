import mongoose, { ObjectId, Schema } from "mongoose";
import { CustomShirtSchema, ICustomShirt } from "./CustomShirt.js";

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  date: Date;
  articles: {
    customShirts: ICustomShirt[];
  };
  state: "pending" | "paid" | "delivered" | "canceled";
  price: number;
  address: string;
}

export interface IOrderModel extends IOrder, Document {}

export const OrderSchema: Schema = new Schema(
  {
    _id: { type: String, require: true },
    date: { type: Date },
    articles: {
      customShirts: { type: [CustomShirtSchema] },
    },
    state: { type: String },
    price: { type: Number },
    address: { type: String },
  },
  { versionKey: false }
);

export default mongoose.model<IOrderModel>("Order", OrderSchema);
