import { Schema, model } from "mongoose";
import { roles } from "./user.constant";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

export const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    role: {
      type: String,
      enum: roles,
    },

    address: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    budget: { type: Number },
    income: { type: Number },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.statics.isUserExist = async function (
  phoneNumber: number
): Promise<IUser | null> {
  return await User.findOne({ phoneNumber });
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
