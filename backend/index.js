import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import serverless from "serverless-http";

dotenv.config({
  path: "./.env",
});

connectDb()

export const handler = serverless(app);
