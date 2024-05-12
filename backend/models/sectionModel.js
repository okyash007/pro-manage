import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task-v2" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", sectionSchema);

export default User;
