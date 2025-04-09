import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response.error";
import { AuthError } from "@supabase/supabase-js";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { logger } from "../application/log";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    logger.error({
      location: "errorMiddleware.zodError",
      message: "Validation error from zod",
      body: error.message,
    });

    res.status(400).json({
      error: `Validation Error from Zod`,
      message: JSON.stringify(error.errors),
    });
  } else if (error instanceof ResponseError) {
    logger.error({
      location: "errorMiddleware.ResponseError",
      message: "Response Error from backend process",
      body: error.message,
    });

    res.status(error.status).json({
      error: error.message,
    });
  } else if (error instanceof AuthError) {
    logger.error({
      location: "errorMiddleware.AuthError",
      message: "Auth Error from Auth Middleware",
      body: error.message,
    });

    res.status(error.status || 500).json({
      error: "Authentication Error",
      message: error.message,
    });
  } else if (error instanceof JsonWebTokenError) {
    logger.error({
      location: "errorMiddleware.JsonWebTokenError",
      message: "Auth Error from Auth Middleware",
      body: error.message,
    });

    res.status(401).json({
      error: "Unauthorized: invalid Token",
      message: error.message,
    });
  } else if (error instanceof TokenExpiredError) {
    logger.error({
      location: "errorMiddleware.JsonWebTokenError",
      message: "User Access Token Expired",
      body: error.message,
    });

    res.status(401).json({
      error: "Unauthorized: Token Expired",
      message: error.message,
    });
  } else {
    logger.error({
      location: "errorMiddleware",
      message: "Error unhandled",
      body: error.message,
    });

    res.status(500).json({
      error: "Internal Server Error",
      message: `${error.message} ${error.stack}`,
    });
  }
  next();
};
