import { NextFunction, Response } from "express";
import { UserAuthRequest } from "../model/user.model";
import { logger } from "../application/log";
import { NoteService } from "../service/note.service";
import { NoteResponse } from "../model/note.model";

export class NoteController {
  static async create(req: UserAuthRequest, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "noteController.create",
        message: "Initiating notes creation",
        body: req.body,
      });

      const response: NoteResponse = await NoteService.create(
        req.user!,
        req.body
      );

      logger.info({
        location: "noteController.create",
        message: "Finishing notes creation",
        body: response,
      });

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async read(req: UserAuthRequest, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "noteController.read",
        message: "Initiating notes read",
        body: req.body,
      });

      const response: Array<NoteResponse> = await NoteService.read(
        req.user!,
        req.body
      );

      logger.info({
        location: "noteController.read",
        message: "Finishing notes read",
        body: response,
      });

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserAuthRequest, res: Response, next: NextFunction) {
    try {
      logger.info({
        location: "noteController.update",
        message: "Initiating notes update",
        body: req.body,
      });

      const response: NoteResponse = await NoteService.update(
        req.user!,
        req.body
      );

      logger.info({
        location: "noteController.update",
        message: "Finishing notes update",
        body: response,
      });

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
