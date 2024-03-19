import mongoose, { Model, Schema, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || model("User", userSchema);

export default User;
