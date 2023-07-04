import { Response } from "express";

type IApiData<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
  meta?: {
    page: number;
    limit: number;
    count?: number;
  };
};
const responseFormat = <T>(res: Response, data: IApiData<T>): void => {
  const responseData: IApiData<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
    meta: data.meta || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default responseFormat;
