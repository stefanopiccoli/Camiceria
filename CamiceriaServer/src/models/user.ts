import mongoose from "mongoose";
import { CustomShirtSchema } from "./customShirt.js";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  cart: {
    customShirts: {type:[CustomShirtSchema]}
  },
});

export const User = mongoose.model("User", UserSchema);

