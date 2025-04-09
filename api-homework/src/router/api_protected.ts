import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { UserController } from "../controller/user.controller";
import { NoteController } from "../controller/note.controller";

export const apiProtectedRouter = express.Router();

apiProtectedRouter.use(authMiddleware);
apiProtectedRouter.put("/user", UserController.updateUserData);

apiProtectedRouter.post("/note", NoteController.create);
apiProtectedRouter.get("/note", NoteController.read);
apiProtectedRouter.put("/note", NoteController.update);
