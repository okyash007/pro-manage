import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import taskReducer from "./taskSlice.js";
import modalReducer from "./modalSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    modal: modalReducer,
  },
});

export default store;
