import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addTaskWithChecklist,
  analytics,
  deletTaskWithChecklist,
  editChecklist,
  editTask,
  getTaskData,
  getTasks,
} from "../controllers/taskController.js";

export const taskRouter = Router();

taskRouter.route("/add").post(verifyToken, addTaskWithChecklist);
taskRouter.route("/edit/:taskId").post(verifyToken, editTask);
taskRouter.route("/").get(verifyToken, getTasks);
taskRouter.route("/checklist/edit").post(verifyToken, editChecklist);
taskRouter.route("/delete/:taskId").post(verifyToken, deletTaskWithChecklist);
taskRouter.route("/analytics").get(verifyToken, analytics);
taskRouter.route("/:taskId").get(getTaskData);
