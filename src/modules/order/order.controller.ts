import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IOrder } from "./order.interface";
import responseFormat from "../../shared/responseFormat";
import {
  createOrderService,
  getAllOrderService,
  getSingleOrderService,
} from "./order.service";

export const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createOrderService(req.body);

    responseFormat<IOrder>(res, {
      statusCode: 200,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllOrderService(req.user);

  responseFormat<IOrder[]>(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully !",
    data: result,
  });
});

export const singleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleOrderService(id, req.user);

  responseFormat<IOrder>(res, {
    statusCode: 200,
    success: true,
    message: "Order information retrieved successfully",
    data: result,
  });
});
