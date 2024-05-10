import { Router } from "express";
import {
  auth,
  editUser,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userRouter = Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/signup").post(userRegister);
userRouter.route("/auth").get(verifyToken, auth);
userRouter.route("/edit").post(verifyToken, editUser);
