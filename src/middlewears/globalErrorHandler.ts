/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../interfaces/error";
import { handleValidationError } from "../errorHelpers/handleValidationError";
import APIError from "../errorHelpers/APIError";
import handleCastError from "../errorHelpers/handleCastError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let success = false;
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];
  let stack = "";

  if (err?.name === "MongoServerError") {
    statusCode = 400;
    message = err?.message;
    errorMessages = [
      {
        path: err?.code,
        message: err?.message,
      },
    ];
    stack = err?.stack;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
    stack = simplifiedError?.stack;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof APIError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
    stack = err?.stack;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
  }

  res.status(statusCode).json({
    success,
    statusCode,
    message,
    errorMessages,
    stack,
  });
};
