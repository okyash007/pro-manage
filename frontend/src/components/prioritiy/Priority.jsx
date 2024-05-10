import React from "react";
import styles from "./priority.module.css";

const Priority = ({ priority }) => {
  return (
    <div className={styles.box}>
      <div
        className={styles.color}
        style={{
          backgroundColor:
            priority === "high"
              ? "#FF2473"
              : priority === "low"
              ? "#63C05B"
              : "#18B0FF",
        }}
      ></div>
      <p>{priority.toUpperCase() + " " + "PRIORITY"}</p>
    </div>
  );
};

export default Priority;
