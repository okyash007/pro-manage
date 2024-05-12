import mongoose from "mongoose";

const taskV2Schema = new mongoose.Schema(
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
    index: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checklists: [
      {
        title: {
          type: String,
          require: true,
        },
        isDone: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const TaskV2 = mongoose.model("Task-v2", taskV2Schema);

export default TaskV2;
