import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ICow } from "../cow/cow.interface";

export interface IOrder {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
}
export type OrderModel = Model<IOrder, Record<string, unknown>>;

export interface IUserInterfaceWithId extends IUser {
  _id: Types.ObjectId;
}
