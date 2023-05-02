import mongoose, { ObjectId, Schema } from "mongoose";
import { CustomShirtSchema, ICustomShirt } from "./CustomShirt.js";

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  date: Date;
  articles: {
    customShirts: ICustomShirt[];
  };
  state: "pending" | "shipped" | "delivered" | "canceled";
  price: number;
  shipment: {
    name: string;
    address : string;
    city: string;
    province: string;
    cap: string;
  }
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
    shipment: {
      name: {type: String},
      address : {type: String},
      city: {type: String},
      province: {type: String},
      cap: {type: String},
    }
  },
  { versionKey: false }
);

export default mongoose.model<IOrderModel>("Order", OrderSchema);
