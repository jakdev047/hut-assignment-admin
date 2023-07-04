import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ILocation =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";
export type ICategory = "Dairy" | "Beef" | "Dual Purpose";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  weight: number;
  breed: string;
  label: "for sale" | "sold out";
  category: ICategory;
  seller: Types.ObjectId | IUser;
};
export type CowModel = Model<ICow, Record<string, unknown>>;
export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
};
