import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createTask, editTask } from "../controllers/taskV2Controller.js";

export const taskV2Router = Router();

taskV2Router.route("/add").post(verifyToken, createTask);
taskV2Router.route("/edit/:id").post(verifyToken, editTask);
