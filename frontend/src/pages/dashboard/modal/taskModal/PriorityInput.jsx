import React from "react";
import styles from "./modal.module.css";
import { PriorityChip } from "../../../../stylesComponents/styles";
import Priority from "../../../../components/prioritiy/Priority";
import { useDispatch, useSelector } from "react-redux";
import { editTaskData } from "../../../../store/modalSlice";

const PriorityInput = () => {
  const dispatch = useDispatch();

  const priority = useSelector(
    (store) => store.modal.taskModal.data.taskData?.priority
  );

  return (
    <div className={styles.priorityChips}>
      <PriorityChip
        select={priority === "high"}
        onClick={() =>
          dispatch(editTaskData({ key: "priority", value: "high" }))
        }
      >
        <Priority priority={"high"} />
      </PriorityChip>
      <PriorityChip
        select={priority === "modrate"}
        onClick={() =>
          dispatch(editTaskData({ key: "priority", value: "modrate" }))
        }
      >
        <Priority priority={"modrate"} />
      </PriorityChip>
      <PriorityChip
        select={priority === "low"}
        onClick={() =>
          dispatch(editTaskData({ key: "priority", value: "low" }))
        }
      >
        <Priority priority={"low"} />
      </PriorityChip>
    </div>
  );
};

export default PriorityInput;
