import { z } from "zod";
import { apiError } from "../utils/apiError.js";
import Checklist from "../models/checklistModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Task from "../models/taskModel.js";
import { apiResponse } from "../utils/apiResponse.js";

export const checklistSchema = z.object({
  title: z.string(),
  isDone: z.boolean().default(false).optional(),
});

export const updateChecklistSchema = z.object({
  _id: z.string(),
  title: z.string(),
  isDone: z.boolean().default(false).optional(),
});

export async function createChecklists(checklistData) {
  const createdChecklists = await Checklist.insertMany(checklistData);

  if (!createdChecklists) {
    return false;
  }

  return createdChecklists.map((checklist) => checklist._id);
}

export async function editCheckList(updatedChecklistData) {
  const checklist = await Checklist.findById(updatedChecklistData._id);

  if (!checklist) {
    return false;
  }

  if (updatedChecklistData.title == undefined) {
    checklist.title = checklist.title;
  } else {
    checklist.title = updatedChecklistData.title;
  }
  if (updatedChecklistData.isDone == undefined) {
    checklist.isDone = checklist.isDone;
  } else {
    checklist.isDone = updatedChecklistData.isDone;
  }

  await checklist.save();

  return checklist;
}

export async function deleteChecklists(checklistIds) {
  const deletedChecklists = await Checklist.deleteMany({
    _id: { $in: checklistIds },
  });

  return checklistIds;
}
