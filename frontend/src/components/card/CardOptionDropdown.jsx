import React from "react";
import styles from "./card.module.css";
import { useDispatch } from "react-redux";
import {
  addTaskData,
  addUpdatedChecklistData,
  toggleDeleteModal,
  toggleTaskModal,
} from "../../store/modalSlice";
import { copyToClipboard } from "../../utils/helper";
import { popToast } from "../toasts/toast";
import { frontendUrl } from "../../utils/constants";

const CardOptionDropdown = ({ cardData, setCardOptionDropDown }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.cardOptionsModal}>
      <p
        onClick={() => {
          dispatch(toggleTaskModal(cardData._id));
          dispatch(addTaskData(cardData));
          dispatch(addUpdatedChecklistData(cardData.checklists));
          setCardOptionDropDown(false);
        }}
      >
        Edit
      </p>
      <p
        onClick={() => {
          copyToClipboard(`${frontendUrl}/share/${cardData._id}`);
          setCardOptionDropDown(false);
          popToast("Link Copied");
        }}
      >
        Share
      </p>
      <p
        className={styles.delete}
        onClick={() => {
          dispatch(toggleDeleteModal(cardData));
          setCardOptionDropDown(false);
        }}
      >
        Delete
      </p>
    </div>
  );
};

export default CardOptionDropdown;
