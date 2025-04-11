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
        httpOnly: false, // Prevent client-side access
        secure: true,
        sameSite: "lax", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/auth/refresh",
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
        body: req.body,
      });

      const request: UserRefreshTokenRequest =
        req.body as UserRefreshTokenRequest;
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

      const response: AuthResponse = await UserService.updateUserConfig(
        req.user!,
        req.body
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
}
