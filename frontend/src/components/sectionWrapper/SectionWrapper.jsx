import React from "react";
import styles from "./sectionWrapper.module.css";

const SectionWrapper = ({ children, header }) => {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>{header}</div>
      <div className={styles.scroll + " " + "scrollbar-v"}>{children}</div>
    </section>
  );
};

export default SectionWrapper;
