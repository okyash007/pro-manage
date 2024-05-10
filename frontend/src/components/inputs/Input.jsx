import React from "react";
import styles from "./input.module.css";

const Input = ({ icon, id, placeholder, value }) => {
  return (
    <div className={styles.input}>
      {icon}
      <input id={id} type="text" placeholder={placeholder} value={value} />
    </div>
  );
};

export default Input;
