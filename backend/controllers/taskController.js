import { date, z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import Task from "../models/taskModel.js";
import { apiResponse } from "../utils/apiResponse.js";
import {
  addElementsToArray,
  getTimeBasedOnFilter,
  isDatePassed,
  removeElementsFromArray,
} from "../utils/helper.js";
import {
  createChecklists,
  deleteChecklists,
  editCheckList,
} from "./checklistController.js";

const taskSchema = z.object({
  title: z.string().min(1),
  priority: z.enum(["low", "modrate", "high"]),
  dueDate: z.date().optional(),
  section: z
    .enum(["backlog", "toDo", "inProgress", "done"])
    .default("toDo")
    .optional(),
  user: z.string().min(1),
});

const newChecklistsSchema = z.object({
  title: z.string().min(1),
  isDone: z.boolean().default(false).optional(),
});

const updateChecklistSchema = z.object({
  _id: z.string(),
  title: z.string().min(1),
  isDone: z.boolean().default(false).optional(),
});

export const addTaskWithChecklist = asyncHandler(async (req, res, next) => {
  const { taskData, newChecklistData } = req.body;

  if (req.body.taskData.dueDate) {
    req.body.taskData.dueDate = new Date(req.body.taskData.dueDate);
  }

  const validatedNewChecklistData = newChecklistsSchema
    .array()
    .safeParse(newChecklistData);

  if (!validatedNewChecklistData.success || newChecklistData.length == 0) {
    return next(new apiError(400, "Invalid Checklist Input"));
  }

  const validatedTaskData = taskSchema.safeParse(taskData);

  if (!validatedTaskData.success) {
    return next(new apiError(400, "Invalid Task Inputs"));
  }

  const userId = req.user.id;

  if (userId !== taskData.user) {
    return next(new apiError(400, "Unaithorized"));
  }

  const checklistIds = await createChecklists(newChecklistData);

  if (checklistIds == false) {
    return next(new apiError(400, "Checklists cant be created"));
  }

  const newTask = new Task(validatedTaskData.data);

  newTask.checklists = checklistIds;

  await newTask.save();

  const newTaskSend = await Task.findById(newTask._id).populate("checklists");

  return res.json(new apiResponse(200, newTaskSend));
});

export const editTask = asyncHandler(async (req, res, next) => {
  const {
    taskData,
    updatedChecklistData,
    newChecklistData,
    deletedChecklistIds,
  } = req.body;

  if (req.body.taskData.dueDate) {
    req.body.taskData.dueDate = new Date(req.body.taskData.dueDate);
  }

  const validatedUpdatedTaskData = taskSchema.safeParse(taskData);

  const validatedNewChecklistData = newChecklistsSchema
    .array()
    .safeParse(newChecklistData);

  const validatedUpdatedChecklistData = updateChecklistSchema
    .array()
    .safeParse(updatedChecklistData);

  if (!validatedUpdatedTaskData.success) {
    return next(new apiError(400, "Invalid Task Inputs"));
  }

  const userId = req.user.id;

  if (userId !== taskData.user) {
    return next(new apiError(400, "You can only change your tasks"));
  }

  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (
    deletedChecklistIds &&
    deletedChecklistIds.length == task.checklists.length &&
    !newChecklistData
  ) {
    return next(
      new apiError(400, "There should be atleast 1 checklist in your task")
    );
  }

  let newChecklistIdsHere = [];
  let deleteChecklistIdsHere = [];

  if (newChecklistData) {
    if (!validatedNewChecklistData.success || newChecklistData.length == 0) {
      return next(new apiError(400, "New checklist input is not valid"));
    }

    const newChecklistIds = await createChecklists(newChecklistData);

    if (newChecklistIds === false) {
      return next(new apiError(400, "Checklist cant be created"));
    }

    newChecklistIdsHere = [...newChecklistIds];
  }

  if (deletedChecklistIds) {
    const deleteChecklistIds = await deleteChecklists(deletedChecklistIds);
    deleteChecklistIdsHere = [...deleteChecklistIds];
  }

  if (updatedChecklistData) {
    if (
      !validatedUpdatedChecklistData.success ||
      updatedChecklistData.length == 0
    ) {
      return next(new apiError(400, "Updated checklist input is not valid"));
    }

    async function updateChecklist(updatedChecklist) {
      const data = await editCheckList(updatedChecklist);
      if (data === false) {
        next(new apiError(400, "checklist cant be updated"));
      }
    }

    updatedChecklistData.map((updatedChecklist) => {
      updateChecklist(updatedChecklist);
    });
  }

  // else if (validatedUpdatedTaskData.data.section == "done") {
  //   task.section = "done";

  //   async function updateChecklist(updatedChecklist) {
  //     const data = await editCheckList(updatedChecklist);
  //     if (data === false) {
  //       next(new apiError(400, "checklist cant be updated"));
  //     }
  //   }

  //   task.checklists.map((m) => {
  //     updateChecklist({ _id: m, isDone: true });
  //   });
  // }

  const taskChecklist = task.checklists;

  const removeChecklistFromTask = removeElementsFromArray(
    taskChecklist,
    deleteChecklistIdsHere
  );

  const addChecklistToTask = addElementsToArray(
    removeChecklistFromTask,
    newChecklistIdsHere
  );

  task.checklists = addChecklistToTask;

  task.title = validatedUpdatedTaskData.data.title;
  task.priority = validatedUpdatedTaskData.data.priority;

  task.dueDate = validatedUpdatedTaskData.data.dueDate || undefined;

  if (
    validatedUpdatedTaskData.data.dueDate &&
    validatedUpdatedTaskData.data.dueDate !== null
  ) {
    task.dueDate = validatedUpdatedTaskData.data.dueDate;
  } else if (
    validatedUpdatedTaskData.data.dueDate === null ||
    !validatedUpdatedTaskData.data.dueDate
  ) {
    task.dueDate = undefined;
  }

  if (task.section == validatedUpdatedTaskData.data.section) {
    await task.save({ timestamps: false });
  } else {
    task.section = validatedUpdatedTaskData.data.section
      ? validatedUpdatedTaskData.data.section
      : "toDo";
    await task.save();
  }

  const updatdTask = await Task.findById(taskId).populate("checklists");

  return res.json(new apiResponse(200, updatdTask));
});

export const getTasks = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { section, timeFilter } = req.query;

  const currentDate = new Date();

  const filter = {
    user: userId,
    ...(section && { section }),
    ...(timeFilter && {
      createdAt: {
        $gte: getTimeBasedOnFilter(timeFilter),
        $lt: currentDate,
      },
    }),
  };

  const tasks = await Task.find(filter)
    .sort({ updatedAt: 1 })
    .populate("checklists")
    .exec();

  return res.json(new apiResponse(200, tasks));
});

export const editChecklist = asyncHandler(async (req, res, next) => {
  const { taskId, updatedChecklistData } = req.body;

  const task = await Task.findById(taskId);

  if (task.user != req.user.id) {
    return next(new apiError(400, "You can only update your Task"));
  }

  if (!task.checklists.includes(updatedChecklistData._id)) {
    return next(new apiError(400, "task does'nt have this checklist"));
  }

  const data = await editCheckList(updatedChecklistData);

  if (data === false) {
    return next(new apiError(400, "Chacklist Cant be updated"));
  }

  const updatedTask = await Task.findById(taskId).populate("checklists");

  return res.json(new apiResponse(200, updatedTask));
});

export const deletTaskWithChecklist = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const user = req.user.id;

  const task = await Task.findById(taskId);

  if (task.user.toString() !== user) {
    return next(new apiError(400, "you can only delet your task"));
  }

  const data = await deleteChecklists(task.checklists);
  if (!data) {
    return next(new apiError(400, "chacklist cant be deleted"));
  }

  const result = await Task.deleteOne({ _id: taskId });

  return res.json(new apiResponse(200, result));
});

export const getTaskData = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate("checklists");

    if (!task) {
      return next(new apiError(400, "no such task is there"));
    }

    return res.json(new apiResponse(200, task));
  } catch (error) {
    return next(new apiError(400, "cant find your task"));
  }
};

export const analytics = asyncHandler(async (req, res, next) => {
  const user = req.user.id;

  const backlogTasks = await Task.find({ section: "backlog", user });
  const todoTasks = await Task.find({ section: "toDo", user });
  const inProgressTasks = await Task.find({ section: "inProgress", user });
  const doneTasks = await Task.find({ section: "done", user });
  const lowPriorityTasks = await Task.find({ priority: "low", user });
  const modratePriorityTasks = await Task.find({ priority: "modrate", user });
  const highPriorityTasks = await Task.find({ priority: "high", user });
  const dueDateTasks = await Task.find({
    dueDate: { $exists: true },
    section: { $ne: "done" },
    user,
  });

  return res.json(
    new apiResponse(200, {
      tasksBySection: {
        backlogTasks: backlogTasks.length,
        todoTasks: todoTasks.length,
        inProgressTasks: inProgressTasks.length,
        doneTasks: doneTasks.length,
      },
      tasksByPriority: {
        lowPriorityTasks: lowPriorityTasks.length,
        modratePriorityTasks: modratePriorityTasks.length,
        highPriorityTasks: highPriorityTasks.length,
        dueDateTasks: dueDateTasks.filter((m) => !isDatePassed(m.dueDate)).length,
      },
    })
  );
});
