import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routers/v1Router.js";
import { errorMiddleWare } from "./middlewares/errorMiddleWare.js";

export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://promanage-frontend.vercel.app",
      "https://pro-manage-yash.vercel.app",
      "https://pro-manage.okyash.tech",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.json({
    message: "welcome to server",
  });
});

app.use("/api/v1", router);

app.use(errorMiddleWare);
