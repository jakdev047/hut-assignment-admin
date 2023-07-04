import { Model } from "mongoose";
export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: UserName;
  role: "seller" | "buyer";
  password: string;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = {
  isUserExist(phoneNumber: number): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
