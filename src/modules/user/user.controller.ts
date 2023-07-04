import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import {
  deleteUserService,
  getAllUserService,
  getSingleUserService,
  updateUserService,
} from "./user.service";
import responseFormat from "../../shared/responseFormat";
import { IUser } from "./user.interface";

export const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllUserService();

    responseFormat<IUser[]>(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleUserService(id);

  responseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await getSingleUserService(req?.user?._id);

  responseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const updateUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const updatedData = req.body;
    const result = await updateUserService(req?.user?._id, updatedData);

    responseFormat<IUser>(res, {
      statusCode: 200,
      success: true,
      message: "User updated successfully",
      data: result,
    });
  }
);

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await updateUserService(id, updatedData);

  responseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteUserService(id);

  responseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
