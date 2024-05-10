import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema(
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
  { timestamps: true }
);

const Checklist = mongoose.model("Checklist", checklistSchema);

export default Checklist;
