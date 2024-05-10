import React, { useState } from "react";
import styles from "../taskModal/modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../../store/taskSlice";
import { useClickOutSide } from "../../../../utils/hooks/useClickOutside";
import { CircelButton } from "../../../../stylesComponents/styles";
import { makePostRequest } from "../../../../apis/makePostRequest";
import { backendUrl } from "../../../../utils/constants";
import Loader from "../../../../components/loader/Loader";
import { toggleDeleteModal } from "../../../../store/modalSlice";
import { popErrorToast, popToast } from "../../../../components/toasts/toast";

const DeletModal = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const taskData = useSelector((store) => store.modal.deletModal.data);

  const deletModalRef = useClickOutSide(() => {
    dispatch(toggleDeleteModal());
  });

  async function deleteTaskHere() {
    const deletdTaskData = await makePostRequest(
      `${backendUrl}/api/v1/task/delete/${taskData._id}`
    );

    setLoading(false);

    if (deletdTaskData.sucess) {
      dispatch(deleteTask({ section: taskData.section, taskId: taskData._id }));
      dispatch(toggleDeleteModal());
      popToast("Task Deleted");
    } else {
      popErrorToast("Task cant be deleted");
    }
  }

  return (
    <div className={styles.bg}>
      <div className={styles.deletModal} ref={deletModalRef}>
        <h4>Are you sure you want to Delete?</h4>
        {loading ? (
          <CircelButton color="#17A2B8">
            <Loader size={"1rem"} color={"white"} />
          </CircelButton>
        ) : (
          <CircelButton
            color="#17A2B8"
            onClick={() => {
              setLoading(true);
              deleteTaskHere();
            }}
          >
            Yes, Delete"
          </CircelButton>
        )}

        <CircelButton
          outline
          color="#CF3636"
          onClick={() => dispatch(toggleDeleteModal())}
        >
          Cancel
        </CircelButton>
      </div>
    </div>
  );
};

export default DeletModal;
