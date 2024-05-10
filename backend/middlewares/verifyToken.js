import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return next(new apiError(401, "user is not authorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(new apiError(403, "forbidden"));
    req.user = user;
    next();
  });
};
