import React, { useState } from "react";
import styles from "./checklist.module.css";
import Checkbox from "./Checkbox";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  editNewChecklistData,
  editUpdatedChecklistData,
  removeNewChecklistData,
  removeUpdatedChecklistData,
} from "../../store/modalSlice";

const CreatedChecklist = ({ index, checklistData }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.border}>
      <Checkbox
        checked={checklistData.isDone}
        onClick={() => {
          if (checklistData._id) {
            dispatch(
              editUpdatedChecklistData({
                objectId: index,
                data: {
                  title: checklistData.title,
                  isDone: !checklistData.isDone,
                  _id: index,
                },
              })
            );
          } else {
            dispatch(
              editNewChecklistData({
                index,
                data: {
                  title: checklistData.title,
                  isDone: !checklistData.isDone,
                },
              })
            );
          }
        }}
      />
      <input
        className={styles.inputTitle}
        value={checklistData.title}
        placeholder="Add a task"
        onChange={(e) => {
          if (checklistData._id) {
            dispatch(
              editUpdatedChecklistData({
                objectId: index,
                data: {
                  title: e.target.value,
                  isDone: checklistData.isDone,
                  _id: index,
                },
              })
            );
          } else {
            dispatch(
              editNewChecklistData({
                index,
                data: { title: e.target.value, isDone: checklistData.isDone },
              })
            );
          }
        }}
        type="text"
      />
      <div className={styles.iconDiv}>
        <MdDelete
          size={"1.5rem"}
          color="#CF3636"
          onClick={() => {
            if (checklistData._id) {
              dispatch(removeUpdatedChecklistData({ objectId: index }));
            } else {
              dispatch(removeNewChecklistData({ index }));
            }
          }}
        />
      </div>
    </div>
  );
};

export default CreatedChecklist;
