import React from "react";
import styles from "./board.module.css";
import Topbar from "./topbar/Topbar";
import Section from "./section/Section";

const Board = () => {
  return (
    <main className={styles.main}>
      <Topbar />
      <div className={styles.board + " " + "scrollbar-h"}>
        <Section section={"backlog"}></Section>
        <Section section={"toDo"}></Section>
        <Section section={"inProgress"}></Section>
        <Section section={"done"}></Section>
      </div>
    </main>
  );
};

export default Board;
