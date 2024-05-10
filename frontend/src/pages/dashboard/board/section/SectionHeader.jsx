import React from "react";
import styles from "./section.module.css";
import { useDispatch } from "react-redux";
import { toggleTaskModal } from "../../../../store/modalSlice";
import { collapseAllChecklist } from "../../../../store/taskSlice";
import { formatString } from "../../../../utils/helper";
import { MdAdd } from "react-icons/md";
import { VscCollapseAll } from "react-icons/vsc";

const SectionHeader = ({ section }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.header}>
      <p>{formatString(section)}</p>
      <div className={styles.headerBtns}>
        {section === "toDo" && (
          <MdAdd
            className={styles.icon}
            size={"1.5rem"}
            onClick={() => dispatch(toggleTaskModal())}
          />
        )}
        <VscCollapseAll
          className={styles.icon}
          size={"1.5rem"}
          color="#767575"
          onClick={() => {
            dispatch(collapseAllChecklist({ section }));
          }}
        />
      </div>
    </div>
  );
};

export default SectionHeader;
