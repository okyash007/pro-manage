import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editTaskData, toggleTaskModal } from "../../../../store/modalSlice";
import { popErrorToast, popToast } from "../../../../components/toasts/toast";
import DueDate from "./dueDate/DueDate";
import { useClickOutSide } from "../../../../utils/hooks/useClickOutside";
import { addTask, updateTask } from "../../../../store/taskSlice";
import { CircelButton } from "../../../../stylesComponents/styles";
import { makePostRequest } from "../../../../apis/makePostRequest";
import { backendUrl } from "../../../../utils/constants";
import Loader from "../../../../components/loader/Loader";
import PriorityInput from "./PriorityInput";
import AllChecklists from "./AllChecklists";

const Modal = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.modal);
  const user = useSelector((store) => store.user.data);
  const allTaskData = store.taskModal.data;
  const updateTaskId = store.updateTaskId;
  const [loading, setLoading] = useState(false);

  function validateTaskData(obj) {
    if (obj.title && obj.title.trim() !== "" && obj.priority && obj.user) {
      return true;
    } else {
      return false;
    }
  }

  function validateChecklist(array) {
    if (array == undefined) {
      return true;
    } else if (array.length == 0) {
      return false;
    } else {
      return array.every((obj) => obj.title.trim() !== "");
    }
  }

  async function addTaskHere() {
    const newTask = await makePostRequest(
      `${backendUrl}/api/v1/task/add`,
      allTaskData
    );
    setLoading(false);
    if (newTask.sucess) {
      dispatch(
        addTask({ section: newTask.data.section, newTask: newTask.data })
      );
      dispatch(toggleTaskModal());
      popToast("new Task added in To Do section");
    } else {
      popErrorToast(newTask.message);
    }
  }

  async function editTaskHere() {
    const updatedTask = await makePostRequest(
      `${backendUrl}/api/v1/task/edit/${updateTaskId}`,
      allTaskData
    );
    setLoading(false);
    if (updatedTask.sucess) {
      dispatch(
        updateTask({
          section: updatedTask.data.section,
          taskId: updatedTask.data._id,
          updatedTask: updatedTask.data,
        })
      );
      dispatch(toggleTaskModal());
      popToast("Task updated");
    } else {
      popErrorToast(updatedTask.message);
    }
  }

  const modalRef = useClickOutSide(() => {
    dispatch(toggleTaskModal());
  });

  useEffect(() => {
    dispatch(editTaskData({ key: "user", value: user._id }));
  }, []);

  const allChecklists =
    allTaskData.updatedChecklistData && allTaskData.newChecklistData
      ? [...allTaskData.updatedChecklistData, ...allTaskData.newChecklistData]
      : allTaskData.updatedChecklistData && !allTaskData.newChecklistData
      ? [...allTaskData.updatedChecklistData]
      : !allTaskData.updatedChecklistData && allTaskData.newChecklistData
      ? [...allTaskData.newChecklistData]
      : [];

  const trueChecklistData = allChecklists.filter((m) => m.isDone == true);

  return (
    <div className={styles.bg}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.title}>
          <div>
            <span className={styles.lable}>Title</span>
            <span className={styles.required}>*</span>
          </div>
          <input
            className={styles.titleInput}
            type="text"
            placeholder="Enter Task Title"
            value={
              allTaskData.taskData?.title ? allTaskData.taskData?.title : ""
            }
            onChange={(e) => {
              dispatch(editTaskData({ key: "title", value: e.target.value }));
            }}
          />
        </div>
        <div className={styles.priority}>
          <div>
            <span className={styles.lable}>Priority</span>
            <span className={styles.required}>*</span>
          </div>
          <PriorityInput priority={allTaskData.taskData?.priority} />
        </div>
        <div>
          <span className={styles.lable}>
            Checklist({trueChecklistData.length}/{allChecklists.length})
          </span>
          <span className={styles.required}>*</span>
        </div>
        <div className={styles.checklist + " " + "scrollbar-v-checklist"}>
          <AllChecklists />
        </div>
        <div className={styles.btns}>
          <div>
            <DueDate />
          </div>
          <div className={styles.rightBtns}>
            <CircelButton
              outline
              color="#CF3636"
              onClick={() => dispatch(toggleTaskModal())}
            >
              Cancel
            </CircelButton>
            {loading ? (
              <CircelButton color="#17A2B8">
                <Loader color={"white"} />
              </CircelButton>
            ) : (
              <CircelButton
                color="#17A2B8"
                onClick={() => {
                  if (updateTaskId) {
                    if (
                      allTaskData.taskData &&
                      validateTaskData(allTaskData.taskData) &&
                      validateChecklist(allTaskData.newChecklistData) &&
                      validateChecklist(allTaskData.updatedChecklistData) &&
                      allChecklists.length !== 0
                    ) {
                      setLoading(true);
                      editTaskHere();
                    } else {
                      popErrorToast("Add all Inputs first");
                    }
                  } else {
                    if (
                      allTaskData.taskData &&
                      validateTaskData(allTaskData.taskData) &&
                      validateChecklist(allTaskData.newChecklistData) &&
                      allChecklists.length !== 0
                    ) {
                      setLoading(true);
                      addTaskHere();
                    } else {
                      popErrorToast("Add all Inputs first");
                    }
                  }
                }}
              >
                save
              </CircelButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
