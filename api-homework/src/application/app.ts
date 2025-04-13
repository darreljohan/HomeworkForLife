import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { apiPublicRouter } from "../router/api_public";
import { errorMiddleware } from "../middleware/error.middleware";
import { apiProtectedRouter } from "../router/api_protected";

export const app = express();
app.use(
  cors({
    origin: "http://localhost:10161", // or your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(apiPublicRouter);
app.use(apiProtectedRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.SUPABASE_URL} `);
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
