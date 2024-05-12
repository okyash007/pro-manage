import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

export const taskV2Router = Router();

taskV2Router.route("/add").post(verifyToken);
