import React from "react";
import styles from "./analytics.module.css";

const AnalyticsChip = ({ text }) => {
  return (
    <div className={styles.chip}>
      <div></div>
      <p>{text}</p>
    </div>
  );
};

export default AnalyticsChip;
