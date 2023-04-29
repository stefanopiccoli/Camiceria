import mongoose, { Schema } from "mongoose";
import { CustomShirtSchema, ICustomShirt } from "./CustomShirt.js";

export interface IUser {
  _id: string;
  username: string;
  cart: {
    customShirts: ICustomShirt[];
  };
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    _id: {type: String, require: true},
    username: { type: String},
    cart: {
      customShirts: { type: [CustomShirtSchema] },
    },
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>("User", UserSchema);
