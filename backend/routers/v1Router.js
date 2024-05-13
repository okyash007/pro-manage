import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { taskRouter } from "./taskRouter.js";
import { sectionRouter } from "./sectionRouter.js";
import { taskV2Router } from "./taskV2Router.js";

export const router = Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);
router.use("/task/v2", taskV2Router);
router.use("/section", sectionRouter);
