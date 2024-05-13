import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createSection } from "../controllers/sectionController.js";

export const sectionRouter = Router();

sectionRouter.route("/add").post(verifyToken, createSection);
