import express from "express";
import { UserController } from "../controller/user.controller";

export const apiPublicRouter = express.Router();

apiPublicRouter.post("/auth/register", UserController.create);
apiPublicRouter.post("/auth/login", UserController.login);
apiPublicRouter.post("/auth/refresh", UserController.refreshToken);
