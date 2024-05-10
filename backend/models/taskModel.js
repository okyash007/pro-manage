import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "modrate", "high"],
      required: true,
    },
    dueDate: {
      type: Date,
    },
    section: {
      type: String,
      enum: ["backlog", "toDo", "inProgress", "done"],
      default: "toDo",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Checklist" }],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
