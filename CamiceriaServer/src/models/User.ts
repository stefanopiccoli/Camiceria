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
    username: { type: String, required: true },
    cart: {
      customShirts: { type: [CustomShirtSchema] },
    },
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>("User", UserSchema);
