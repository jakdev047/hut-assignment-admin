import { Model } from "mongoose";
import { UserName } from "../user/user.interface";
import { Admin_ROLE } from "./admin.constant";

export type IAdmin = {
  name: UserName;
  role: Admin_ROLE.ADMIN;
  password: string;
  phoneNumber: string;
  address: string;
};

export type AdminModel = {
  isAdminExist(phoneNumber: number): Promise<IAdmin>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
