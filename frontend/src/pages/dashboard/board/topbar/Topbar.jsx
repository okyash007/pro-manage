import React, { useState } from "react";
import styles from "./topbar.module.css";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { formatDate, formatString } from "../../../../utils/helper";
import { useClickOutSide } from "../../../../utils/hooks/useClickOutside";
import TimeFilterDropdown from "./TimeFilterDropdown";

const Topbar = () => {
  const user = useSelector((store) => store.user.data);
  const timeFilter = useSelector((store) => store.task.timeFilter);
  const [timeFilterDropdown, setTimeFilterDropdown] = useState(false);

  let timeFilterRef = useClickOutSide(() => {
    setTimeFilterDropdown(false);
  });

  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <h3>Welcome! {user.name}</h3>
        <h2>Board</h2>
      </div>
      <div className={styles.right}>
        <p>{formatDate(new Date()).dayMonthYear}</p>
        <div className={styles.timeFilter} ref={timeFilterRef}>
          <div
            className={styles.timeFilterToggle}
            onClick={() => setTimeFilterDropdown(!timeFilterDropdown)}
          >
            <p>{formatString(timeFilter)}</p>
            {timeFilterDropdown ? (
              <MdKeyboardArrowUp size={"1.5rem"} />
            ) : (
              <MdKeyboardArrowDown size={"1.5rem"} />
            )}
          </div>
          {timeFilterDropdown && (
            <TimeFilterDropdown
              timeFilterDropdown={timeFilterDropdown}
              setTimeFilterDropdown={setTimeFilterDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
