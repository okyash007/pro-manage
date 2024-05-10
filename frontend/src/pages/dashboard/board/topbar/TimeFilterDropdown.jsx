import React from "react";
import styles from "./topbar.module.css";
import { useDispatch } from "react-redux";
import { setTimeFilter } from "../../../../store/taskSlice";

const TimeFilterDropdown = ({ timeFilterDropdown, setTimeFilterDropdown }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.timeFilterDropdown}>
      <p
        onClick={() => {
          dispatch(setTimeFilter("today"));
          setTimeFilterDropdown(!timeFilterDropdown);
        }}
      >
        Today
      </p>
      <p
        onClick={() => {
          dispatch(setTimeFilter("thisWeek"));
          setTimeFilterDropdown(!timeFilterDropdown);
        }}
      >
        This Week
      </p>
      <p
        onClick={() => {
          dispatch(setTimeFilter("thisMonth"));
          setTimeFilterDropdown(!timeFilterDropdown);
        }}
      >
        This Month
      </p>
    </div>
  );
};

export default TimeFilterDropdown;
