import mongoose, { Schema } from "mongoose";
import { CustomShirtSchema } from "./CustomShirt.js";
const UserSchema = new Schema({
    username: { type: String, required: true },
    cart: {
        customShirts: { type: [CustomShirtSchema] },
    },
}, { versionKey: false });
export default mongoose.model("User", UserSchema);
