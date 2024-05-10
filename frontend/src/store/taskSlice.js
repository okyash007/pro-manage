import { createSlice } from "@reduxjs/toolkit";
import { removeElementFromArray } from "../utils/helper";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    timeFilter: "thisWeek",
    tasks: {},
    openedChecklist: {},
  },
  reducers: {
    setTimeFilter: (state, action) => {
      state.timeFilter = action.payload;
    },
    addSection: (state, action) => {
      state.tasks = {
        ...state.tasks,
        [action.payload.key]: action.payload.data,
      };
    },
    toggleDeletModal: (state, action) => {
      state.deletModal.isOpen = !state.deletModal.isOpen;
      state.deletModal.data = action.payload;
    },
    openChecklist: (state, action) => {
      if (state.openedChecklist[action.payload.section]) {
        state.openedChecklist = {
          ...state.openedChecklist,
          [action.payload.section]: [
            ...state.openedChecklist[action.payload.section],
            action.payload.id,
          ],
        };
      } else {
        state.openedChecklist = {
          ...state.openedChecklist,
          [action.payload.section]: new Array(action.payload.id),
        };
      }
    },
    closeChecklist: (state, action) => {
      if (
        state.openedChecklist[action.payload.section]?.includes(
          action.payload.id
        )
      ) {
        state.openedChecklist = {
          ...state.openedChecklist,
          [action.payload.section]: removeElementFromArray(
            state.openedChecklist[action.payload.section],
            action.payload.id
          ),
        };
      }
    },
    collapseAllChecklist: (state, action) => {
      if (state.openedChecklist[action.payload.section]) {
        state.openedChecklist[action.payload.section] = [];
      }
    },
    updateTask: (state, action) => {
      const { section, taskId, updatedTask } = action.payload;
      state.tasks = {
        ...state.tasks,
        [section]: state.tasks[section].map((task) =>
          task._id === taskId ? { ...updatedTask } : task
        ),
      };
    },
    deleteTask: (state, action) => {
      const { section, taskId } = action.payload;
      state.tasks = {
        ...state.tasks,
        [section]: state.tasks[section].filter((task) => task._id !== taskId),
      };
    },
    addTask: (state, action) => {
      const { section, newTask } = action.payload;
      state.tasks = {
        ...state.tasks,
        [section]: [...state.tasks[section], newTask],
      };
    },
  },
});

export const {
  setTimeFilter,
  addSection,
  openChecklist,
  closeChecklist,
  collapseAllChecklist,
  updateTask,
  deleteTask,
  addTask,
} = taskSlice.actions;

export default taskSlice.reducer;
