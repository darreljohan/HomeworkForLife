import { logger } from "../application/log";
import { UserService } from "../service/user.service";
import {
  AuthRequest,
  UserAuthRequest,
  UserRefreshTokenRequest,
  UserRefreshTokenResponse,
  AuthResponse,
} from "../model/user.model";
import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response.error";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "userController.create",
        message: "Initiating user registration",
        body: req.body,
      });

      const request: AuthRequest = req.body as AuthRequest;
      const response: AuthResponse = await UserService.register(request);

      logger.info({
        location: "userController.create",
        message: "Finishing user registration",
        body: response,
      });

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "userController.login",
        message: "Initiating user login",
        body: req.body,
      });

      const request: AuthRequest = req.body as AuthRequest;
      const response: AuthResponse = await UserService.login(request);

      logger.info({
        location: "userController.login",
        message: "Finishing user login",
        body: response,
      });

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
      });

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "userController.refreshToken",
        message: "Initiating user token refresh",
        body: req.cookies,
      });

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new ResponseError(401, "Unauthorized: No refresh token provided");
      }

      const request: UserRefreshTokenRequest = {
        refreshToken: refreshToken,
      };

      const response: UserRefreshTokenResponse = await UserService.refreshToken(
        request
      );

      logger.info({
        location: "userController.refreshToken",
        message: "Finishing user token refresh",
        body: response,
      });

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserData(
    req: UserAuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      logger.info({
        location: "userController.updateUserData",
        message: "Initiating user data update",
        body: req.user,
      });
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new ResponseError(401, "Unauthorized: No refresh token provided");
      }
      const response: AuthResponse = await UserService.updateUserConfig(
        req.user!,
        req.body,
        refreshToken
      );

      logger.info({
        location: "userController.updateUserData",
        message: "User Data Update success",
        body: response,
      });
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: UserAuthRequest, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "userController.me",
        message: "Passing user data to response",
        body: req.user,
      });

      res.status(200).json({ data: req.user });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "userController.refreshToken",
        message: "Initiating logout, deleting user token",
        body: {},
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      logger.info({
        location: "userController.refreshToken",
        message: "Finishing logout",
        body: {},
      });

      res.status(200).json({ data: { message: "success" } });
    } catch (error) {
      next(error);
    }
  }
}
