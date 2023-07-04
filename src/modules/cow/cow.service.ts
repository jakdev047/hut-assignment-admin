import mongoose, { SortOrder } from "mongoose";
import APIError from "../../errorHelpers/APIError";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/error";
import { calculatePagination } from "../../shared/paginationHelper";
import { cowSearchableFields } from "./cow.constant";

export const createCowService = async (cow: ICow): Promise<ICow | null> => {
  cow.label = "for sale";
  const createdCow = (await Cow.create(cow)).populate("seller");

  return createdCow;
};

export const getAllCowService = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, maxPrice, minPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $or: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: Number(maxPrice),
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: Number(minPrice),
      },
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

export const getSingleCowService = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findOne({ _id: new mongoose.Types.ObjectId(id) });
  return result;
};

export const updateCowService = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (!isExist) {
    throw new APIError(404, "Cow not found !");
  }

  const { ...cowData } = payload;
  const updatedCowData: Partial<ICow> = { ...cowData };
  const result = await Cow.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    updatedCowData,
    {
      new: true,
    }
  );
  return result;
};

export const deleteCowService = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
