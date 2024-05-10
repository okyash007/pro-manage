import React from "react";
import styles from "./loader.module.css";

const Loader = ({ color, size }) => {
  return (
    <div
      style={{
        border: `3px solid ${color}`,
        borderLeftColor: "transparent",
        width: size,
        height: size,
      }}
      className={styles.loader}
    ></div>
  );
};

export default Loader;
