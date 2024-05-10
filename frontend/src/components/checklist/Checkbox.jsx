import React from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import styles from "./checklist.module.css";

const Checkbox = ({ checked, onClick }) => {
  return (
    <div
      className={styles.checkbox}
      onClick={() => {
        onClick();
      }}
    >
      {checked ? (
        <ImCheckboxChecked size={"1rem"} color="#17A2B8" />
      ) : (
        <ImCheckboxUnchecked size={"0.75rem"} className={styles.unChecked} color="white" />
      )}
    </div>
  );
};

export default Checkbox;
