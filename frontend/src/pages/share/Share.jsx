import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import styles from "./share.module.css";
import logo from "../../assets/logo.svg";
import Priority from "../../components/prioritiy/Priority";
import ShareChecklist from "./ShareChecklist";
import { DateChip } from "../../stylesComponents/styles";
import { formatDate } from "../../utils/helper";
import { popErrorToast } from "../../components/toasts/toast";
import Loader from "../../components/loader/Loader";

const Share = () => {
  const { taskId } = useParams();

  const [taskData, setTaskData] = useState(null);

  async function getTask() {
    const data = await makeGetRequest(`${backendUrl}/api/v1/task/${taskId}`);
    if (data.sucess) {
      setTaskData(data.data);
    } else if (!data.sucess) {
      popErrorToast(data.message);
      setTaskData(false);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  if (taskData == null) {
    return (
      <div className={styles.bg}>
        <div className={styles.nav}>
          <Link to={"/"} className={styles.heading}>
            <img src={logo} alt="" />
            <h3>Pro Monage</h3>
          </Link>
        </div>
        <div className={styles.noDate}>
          <Loader size={"1rem"} color={"#0000003a"} />
        </div>
      </div>
    );
  }

  if (taskData == false) {
    return (
      <div className={styles.bg}>
        <div className={styles.nav}>
          <Link to={"/"} className={styles.heading}>
            <img src={logo} alt="" />
            <h3>Pro Monage</h3>
          </Link>
        </div>

        <div className={styles.noDate}>
          <p>No such Task is There</p>
        </div>
      </div>
    );
  }

  const trueCheckLists = taskData.checklists.filter(
    (checklist) => checklist.isDone === true
  );

  console.log(taskData.checklists);

  return (
    <div className={styles.bg}>
      <div className={styles.nav}>
        <Link to={"/"} className={styles.heading}>
          <img src={logo} alt="" />
          <h3>Pro Monage</h3>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.details}>
            <Priority priority={taskData.priority} />
            <h2 className={styles.title}>{taskData.title}</h2>
            <h3>
              checklist({trueCheckLists.length}/{taskData.checklists.length})
            </h3>
          </div>
          <div className={styles.checklists + " " + "scrollbar-v-checklist"}>
            {taskData.checklists.map((m) => (
              <ShareChecklist checklistData={m} />
            ))}
          </div>
          <div className={styles.date}>
            {taskData.dueDate && (
              <>
                <p>Due Date</p>
                <DateChip due>{formatDate(taskData.dueDate).monthDay}</DateChip>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
