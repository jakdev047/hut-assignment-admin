import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import responseFormat from "../../shared/responseFormat";
import { ICow } from "./cow.interface";
import {
  createCowService,
  deleteCowService,
  getAllCowService,
  getSingleCowService,
  updateCowService,
} from "./cow.service";
import { pick } from "../../shared/pick";
import { cowFilterableFields } from "./cow.constant";
import { paginationFields } from "../../shared/paginationFields";
import APIError from "../../errorHelpers/APIError";
import mongoose, { Types } from "mongoose";

export const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...cowData } = req.body;
    const result = await createCowService(cowData);
    responseFormat<ICow>(res, {
      success: true,
      statusCode: 200,
      message: "Cow created successfully",
      data: result,
    });
  }
);

export const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await getAllCowService(filters, paginationOptions);

  responseFormat<ICow[]>(res, {
    statusCode: 200,
    success: true,
    message: "Cows retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

export const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleCowService(id);

  responseFormat<ICow>(res, {
    statusCode: 200,
    success: true,
    message: "Cow retrieved successfully",
    data: result,
  });
});

export const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  let userIdAsObjectId = new mongoose.Types.ObjectId(req.user?._id);
  const getCow = await getSingleCowService(id);

  if (getCow && !(getCow?.seller as Types.ObjectId).equals(userIdAsObjectId)) {
    throw new APIError(403, "Forbidden");
  }

  const updatedData = req.body;
  const result = await updateCowService(id, updatedData);

  responseFormat<ICow>(res, {
    statusCode: 200,
    success: true,
    message: "Cow updated successfully",
    data: result,
  });
});

export const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  let userIdAsObjectId = new mongoose.Types.ObjectId(req.user?._id);
  const getCow = await getSingleCowService(id);

  if (getCow && !(getCow?.seller as Types.ObjectId).equals(userIdAsObjectId)) {
    throw new APIError(403, "Forbidden");
  }

  const result = await deleteCowService(id);

  responseFormat<ICow>(res, {
    statusCode: 200,
    success: true,
    message: "Cow deleted successfully",
    data: result,
  });
});
