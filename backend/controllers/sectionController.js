import Section from "../models/sectionModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSection = asyncHandler(async (req, res) => {
  const newTask = new Section(req.body);
  console.log(req.body)

  await newTask.save();

  res.json(newTask)
});
