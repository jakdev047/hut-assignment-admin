import { Request, RequestHandler, Response } from "express";
import {
  createUserService,
  loginUserService,
  getRefreshTokenService,
} from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import responseFormat from "../../shared/responseFormat";
import { IUser } from "../user/user.interface";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../../interfaces/login";

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await createUserService(userData);
    let dataWithoutPass;
    if (result) {
      const { password, ...rest } = result?._doc;
      dataWithoutPass = rest;
    }
    responseFormat<Omit<IUser, "password">>(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully !",
      data: dataWithoutPass,
    });
  }
);

export const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await loginUserService(userData);
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

export const getRefreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await getRefreshTokenService(refreshToken);
    const cookieOptions = {
      secure: true,
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    responseFormat<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: "New access token generated successfully !",
      data: result,
    });
  }
);
