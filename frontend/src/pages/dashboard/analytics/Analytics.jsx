import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../../apis/makeGetRequest";
import { backendUrl } from "../../../utils/constants";
import styles from "./analytics.module.css";
import AnalyticsChip from "./AnalyticsChip";
import Loader from "../../../components/loader/Loader";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  async function getAnalytics() {
    const data = await makeGetRequest(`${backendUrl}/api/v1/task/analytics`);
    if (data.sucess) {
      setAnalytics(data.data);
    }
  }

  useEffect(() => {
    getAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className={styles.loading}>
        <Loader color={"#17A2B8"} size={"1.5rem"} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <h1>Analytics</h1>
      <div className={styles.content}>
        <div className={styles.card}>
          <div>
            <AnalyticsChip text={"Backlog Tasks"} />
            <p className={styles.number}>
              {analytics.tasksBySection.backlogTasks}
            </p>
          </div>
          <div>
            <AnalyticsChip text={"To-do Tasks"} />
            <p className={styles.number}>
              {analytics.tasksBySection.todoTasks}
            </p>
          </div>
          <div>
            <AnalyticsChip text={"In Progress Tasks"} />
            <p className={styles.number}>
              {analytics.tasksBySection.inProgressTasks}
            </p>
          </div>
          <div>
            <AnalyticsChip text={"Completed Tasks"} />
            <p className={styles.number}>
              {analytics.tasksBySection.doneTasks}
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <AnalyticsChip text={"Low Priority"} />
            <p className={styles.number}>
              {analytics.tasksByPriority.lowPriorityTasks}
            </p>
          </div>
          <div>
            <AnalyticsChip text={"Modrate Priority"} />
            <p className={styles.number}>
              {analytics.tasksByPriority.modratePriorityTasks}
            </p>
          </div>
          <div>
            <AnalyticsChip text={"High Priority"} />
            <p className={styles.number}>
              {analytics.tasksByPriority.highPriorityTasks}
            </p>
          </div>
          <div>
            <AnalyticsChip text={"Due Date Priority"} />
            <p className={styles.number}>
              {analytics.tasksByPriority.dueDateTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
