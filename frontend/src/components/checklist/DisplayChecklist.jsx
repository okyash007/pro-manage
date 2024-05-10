import React, { useEffect, useState } from "react";
import styles from "./checklist.module.css";
import Checkbox from "./Checkbox";
import { makePostRequest } from "../../apis/makePostRequest";
import { backendUrl } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../store/taskSlice";
import Loader from "../loader/Loader";

const DisplayChecklist = ({ checklistData, taskData }) => {
  const [thisChecklistData, setThisChecklistData] = useState(checklistData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const tasts = useSelector((store) => store.task.tasks);

  async function editChecklist() {
    const newChecklistData = await makePostRequest(
      `${backendUrl}/api/v1/task/checklist/edit`,
      {
        taskId: taskData._id,
        updatedChecklistData: {
          _id: thisChecklistData._id,
          title: thisChecklistData.title,
          isDone: !thisChecklistData.isDone,
        },
      }
    );

    setLoading(false);

    const newThisChecklistData = newChecklistData.data.checklists.find(
      (obj) => obj._id === thisChecklistData._id
    );

    setThisChecklistData((prev) => ({
      ...prev,
      title: newThisChecklistData.title,
      isDone: newThisChecklistData.isDone,
    }));

    dispatch(
      updateTask({
        section: taskData.section,
        taskId: taskData._id,
        updatedTask: newChecklistData.data,
      })
    );
  }

  useEffect(() => {
    setThisChecklistData(checklistData);
  }, [tasts]);

  return (
    <div className={styles.border}>
      {loading ? (
        <Loader size={"0.75rem"} color={"#17A2B8"} />
      ) : (
          <Checkbox
            onClick={() => {
              setLoading(true);
              editChecklist();
            }}
            checked={thisChecklistData.isDone}
          />
      )}

      <p>{thisChecklistData.title}</p>
    </div>
  );
};

export default DisplayChecklist;
