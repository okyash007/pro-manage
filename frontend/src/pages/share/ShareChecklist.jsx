import React from "react";
import styles from "./share.module.css";
import Checkbox from "../../components/checklist/Checkbox";

const ShareChecklist = ({ checklistData }) => {
  return (
    <div className={styles.checklistCard}>
      <Checkbox onClick={() => {}} checked={checklistData.isDone} />
      <p>{checklistData.title}</p>
    </div>
  );
};

export default ShareChecklist;
