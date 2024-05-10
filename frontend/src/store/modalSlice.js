import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    updateTaskId: null,
    taskModal: {
      isOpen: false,
      data: {},
    },
    deletModal: {
      isOpen: false,
      data: {},
    },
    logoutM0dal: false,
  },
  reducers: {
    toggleTaskModal: (state, action) => {
      state.taskModal.isOpen = !state.taskModal.isOpen;
      state.updateTaskId = action.payload;
      state.taskModal.data = {};
    },
    toggleDeleteModal: (state, action) => {
      state.deletModal.isOpen = !state.deletModal.isOpen;
      state.deletModal.data = action.payload;
    },
    toggleLogoutModal: (state, action) => {
      state.logoutModal = !state.logoutModal;
    },
    addTaskData: (state, action) => {
      const { checklists, createdAt, updatedAt, __v, _id, ...rest } =
        action.payload;
      state.taskModal.data = {
        taskData: rest,
      };
    },
    editTaskData: (state, action) => {
      const { key, value } = action.payload;
      if (state.taskModal.data.taskData) {
        state.taskModal.data.taskData[key] = value;
        if (value == "" || value == null) {
          delete state.taskModal.data.taskData[key];
        }
      } else if (state.taskModal.data.taskData == {}) {
        delete state.taskModal.data.taskData;
      } else {
        state.taskModal.data = {
          ...state.taskModal.data,
          ["taskData"]: {
            [key]: value,
          },
        };
      }
    },
    addNewChecklistData: (state, action) => {
      if (state.taskModal.data?.newChecklistData) {
        state.taskModal.data.newChecklistData.push({
          title: "",
          isDone: false,
        });
      } else {
        state.taskModal.data = {
          ...state.taskModal.data,
          ["newChecklistData"]: [{ title: "", isDone: false }],
        };
      }
    },
    removeNewChecklistData: (state, action) => {
      const { index } = action.payload;

      state.taskModal.data = {
        ...state.taskModal.data,
        newChecklistData: state.taskModal.data.newChecklistData.filter(
          (m, i) => i != index
        ),
      };

      if (state.taskModal.data.newChecklistData.length === 0) {
        delete state.taskModal.data.newChecklistData;
      }
    },
    editNewChecklistData: (state, action) => {
      const { index, data } = action.payload;

      if (state.taskModal.data.newChecklistData) {
        state.taskModal.data.newChecklistData[index] = data;
      }
    },
    addUpdatedChecklistData: (state, action) => {
      state.taskModal.data = {
        ...state.taskModal.data,
        updatedChecklistData: action.payload.map((m) => {
          const { createdAt, updatedAt, __v, ...rest } = m;
          return rest;
        }),
      };
    },
    removeUpdatedChecklistData: (state, action) => {
      const { objectId } = action.payload;

      if (state.taskModal.data.deletedChecklistIds) {
        state.taskModal.data = {
          ...state.taskModal.data,
          deletedChecklistIds: [
            ...state.taskModal.data.deletedChecklistIds,
            objectId,
          ],
        };
      } else {
        state.taskModal.data = {
          ...state.taskModal.data,
          deletedChecklistIds: [objectId],
        };
      }
      state.taskModal.data = {
        ...state.taskModal.data,
        updatedChecklistData: state.taskModal.data.updatedChecklistData.filter(
          (m) => m._id != objectId
        ),
      };

      if (state.taskModal.data.updatedChecklistData.length === 0) {
        delete state.taskModal.data.updatedChecklistData;
      }
    },
    editUpdatedChecklistData: (state, action) => {
      const { objectId, data } = action.payload;

      if (state.taskModal.data.updatedChecklistData) {
        state.taskModal.data.updatedChecklistData =
          state.taskModal.data.updatedChecklistData.map((item) =>
            item._id === objectId ? data : item
          );
      }
    },
  },
});

export const {
  toggleTaskModal,
  toggleDeleteModal,
  toggleLogoutModal,
  addNewChecklistData,
  removeNewChecklistData,
  editNewChecklistData,
  addUpdatedChecklistData,
  removeUpdatedChecklistData,
  editUpdatedChecklistData,
  addTaskData,
  editTaskData,
} = modalSlice.actions;

export default modalSlice.reducer;
