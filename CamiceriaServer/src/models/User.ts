import mongoose, { Schema } from "mongoose";
import { CustomShirtSchema, ICustomShirt } from "./CustomShirt.js";
import { IOrder, OrderSchema } from "./Order.js";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  cart: {
    customShirts: ICustomShirt[];
  };
  orders: IOrder[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    _id: {type: String, require: true},
    email: {type: String},
    username: { type: String},
    role: {type: String},
    cart: {
      customShirts: { type: [CustomShirtSchema] },
    },
    orders: {type: [OrderSchema]}
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>("User", UserSchema);
