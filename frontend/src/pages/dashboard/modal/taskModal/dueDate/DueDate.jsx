import React, { useState } from "react";
import styles from "./dueDate.module.css";
import { CircelButton, SmallBtn } from "../../../../../stylesComponents/styles";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useClickOutSide } from "../../../../../utils/hooks/useClickOutside";
import { formatDate } from "../../../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { editTaskData } from "../../../../../store/modalSlice";

const DueDate = () => {
  const dispatch = useDispatch();
  const taskData = useSelector((store) => store.modal.taskModal.data.taskData);
  const dueDate = taskData?.dueDate ? taskData.dueDate : null;
  const [calenderModal, setCalenderModal] = useState(false);

  let dueDateRef = useClickOutSide(() => {
    setCalenderModal(false);
  });

  function onChangeForDueDate(value) {
    if (value !== null) {
      dispatch(
        editTaskData({ key: "dueDate", value: formatDate(value).yyyymmdd })
      );
    } else {
      dispatch(editTaskData({ key: "dueDate", value }));
    }
  }

  return (
    <div className={styles.dueDate} ref={dueDateRef}>
      {calenderModal && (
        <div className={styles.calenderModal}>
          <Calendar
            className={styles.calender}
            value={dueDate}
            onChange={onChangeForDueDate}
            onClickDay={() => setCalenderModal(false)}
            tileClassName={styles.calenderContent}
          />
          <div className={styles.dueDateBtns}>
            <SmallBtn onClick={() => onChangeForDueDate(null)}>Clear</SmallBtn>
            <SmallBtn onClick={() => setCalenderModal(false)}>Close</SmallBtn>
          </div>
        </div>
      )}

      <CircelButton
        outline
        color="#707070"
        className={styles.selectData}
        style={{ border: "2px solid #E2E2E2" }}
        onClick={() => setCalenderModal(!calenderModal)}
      >
        {dueDate ? formatDate(dueDate).ddmmyyyy : "Select Due Date"}
      </CircelButton>
    </div>
  );
};

export default DueDate;
