import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { taskRouter } from "./taskRouter.js";

export const router = Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);
router.use("/task/v2", taskRouter);
