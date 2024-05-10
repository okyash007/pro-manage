import React, { useEffect, useState } from "react";
import SectionWrapper from "../../../../components/sectionWrapper/SectionWrapper";
import { makeGetRequest } from "../../../../apis/makeGetRequest";
import { backendUrl } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSection } from "../../../../store/taskSlice";
import CardWrapper from "../../../../components/CardWrapper";
import Card from "../../../../components/card/Card";
import styles from "./section.module.css";
import Loader from "../../../../components/loader/Loader";
import SectionHeader from "./SectionHeader";

const Section = ({ section }) => {
  const tasks = useSelector((store) => store.task);
  const dispatch = useDispatch();

  async function getTasks() {
    const data = await makeGetRequest(
      `${backendUrl}/api/v1/task?section=${section}&timeFilter=${tasks.timeFilter}`
    );
    if (data.sucess) {
      dispatch(addSection({ key: section, data: data.data }));
    }
  }

  useEffect(() => {
    getTasks();
  }, [tasks.timeFilter]);

  const sectionTasks = tasks.tasks[section];

  if (!sectionTasks) {
    return (
      <SectionWrapper>
        <div className={styles.loading}>
          <Loader size={"1rem"} color={"#0000003a"} />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper header={<SectionHeader section={section} />}>
      {sectionTasks.map((m) => (
        <CardWrapper key={m._id}>
          <Card cardData={m} />
        </CardWrapper>
      ))}
    </SectionWrapper>
  );
};

export default Section;
