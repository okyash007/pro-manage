import TaskV2 from "../models/taskV2Model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const newTask = new TaskV2(req.body);

  await newTask.save();

  res.json(newTask);
});

export const editTask = asyncHandler(async (req, res) => {
  const updatedTaskData = { ...req.body, user: req.user };

  await TaskV2.findOneAndUpdate({ _id: req.params.id }, req.body);

  const updatedTask = await TaskV2.findById(req.params.id);

  res.json(updatedTask);
});
