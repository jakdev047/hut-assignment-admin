import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import responseFormat from "../../shared/responseFormat";
import { IAdmin } from "./admin.interface";
import { createAdminService, loginService } from "./admin.service";
import { ILoginUserResponse } from "../../interfaces/login";

export const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...adminData } = req.body;
    const result = await createAdminService(adminData);
    let dataWithoutPass;

    if (result) {
      const { password, ...rest } = result?._doc;
      dataWithoutPass = rest;
    }
    responseFormat<Omit<IAdmin, "password">>(res, {
      success: true,
      statusCode: 200,
      message: "Admin created successfully !",
      data: dataWithoutPass,
    });
  }
);
export const loginAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...adminData } = req.body;
    const result = await loginService(adminData);
    const { refreshToken, ...others } = result;
    const cookieOptions = {
      secure: true,
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    responseFormat<ILoginUserResponse>(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully !",
      data: others,
    });
  }
);
