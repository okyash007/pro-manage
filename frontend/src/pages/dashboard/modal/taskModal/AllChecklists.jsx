import React from "react";
import styles from "./modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewChecklistData } from "../../../../store/modalSlice";
import CreatedChecklist from "../../../../components/checklist/CreatedChecklist";
import { CircelButton } from "../../../../stylesComponents/styles";
import { MdAdd } from "react-icons/md";

const AllChecklists = () => {
  const dispatch = useDispatch();
  const allTaskData = useSelector((store) => store.modal.taskModal.data);

  return (
    <div className={styles.checklists}>
      {allTaskData.updatedChecklistData &&
        allTaskData.updatedChecklistData.map((m, i) => (
          <CreatedChecklist key={m._id} index={m._id} checklistData={m} />
        ))}

      {allTaskData.newChecklistData &&
        allTaskData.newChecklistData.map((m, i) => (
          <CreatedChecklist key={i} index={i} checklistData={m} />
        ))}
      <div>
        <CircelButton
          style={{ border: "2px solid white", marginLeft: "2px" }}
          outline
          color="#767575"
          onClick={() => dispatch(addNewChecklistData())}
        >
          <MdAdd className={styles.icon} size={"1.5rem"} />
          Add New
        </CircelButton>
      </div>
    </div>
  );
};

export default AllChecklists;
