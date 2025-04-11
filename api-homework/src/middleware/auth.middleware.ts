import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response.error";
import { UserAuthRequest } from "../model/user.model";
import supabase from "../application/database";
import { logger } from "../application/log";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || "supabase-j";

export const authMiddleware = async (
  req: UserAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ResponseError(401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];

    logger.info({
      location: "authMiddleware",
      message: "Start verifying jwt token",
      body: authHeader,
    });

    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET) as {
      sub: string;
      email: string;
      user_metadata: {
        ageExpentancy: number;
        birthDate: string;
        displayName: string;
      };
    };

    logger.info({
      location: "authMiddleware",
      message: "Success verifying jwt token",
      body: decoded,
    });

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      config: {
        ageExpentancy: decoded.user_metadata.ageExpentancy,
        birthDate: decoded.user_metadata.birthDate,
        displayName: decoded.user_metadata.displayName,
      },
    };

    await supabase.auth.setSession({
      access_token: token,
      refresh_token: "",
    });

    next();
  } catch (error) {
    next(error);
  }
};
