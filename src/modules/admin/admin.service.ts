import config from "../../config";
import APIError from "../../errorHelpers/APIError";
import { ILoginUser, ILoginUserResponse } from "../../interfaces/login";
import { createToken } from "../../shared/jwtHelper";
import { IAdmin } from "./admin.interafce";
import { Admin } from "./admin.model";
import { Secret } from "jsonwebtoken";

export const createAdminService = async (
  user: IAdmin
): Promise<IAdmin | null> => {
  if (user.role !== "admin") {
    throw new APIError(400, "Not applicable for this user Role");
  }
  const createdAdmin = await Admin.create(user);

  if (!createdAdmin) {
    throw new APIError(400, "failed to create Admin");
  }
  return createdAdmin;
};

export const loginService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new APIError(404, "Admin does not exist");
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new APIError(401, "Password is incorrect");
  }

  const { _id, role } = isAdminExist;
  const accessToken = createToken(
    { _id, role, phoneNumber },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
