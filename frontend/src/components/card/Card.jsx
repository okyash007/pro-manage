import React, { useState } from "react";
import styles from "./card.module.css";
import Priority from "../prioritiy/Priority";
import { DateChip, SmallBtn } from "../../stylesComponents/styles";
import {
  formatDate,
  formatString,
  isDatePassed,
  removeElementFromArray,
} from "../../utils/helper";
import { backendUrl, sections } from "../../utils/constants";
import { BsThreeDots } from "react-icons/bs";
import { useClickOutSide } from "../../utils/hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  closeChecklist,
  deleteTask,
  openChecklist,
} from "../../store/taskSlice";
import DisplayChecklist from "../checklist/DisplayChecklist";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { makePostRequest } from "../../apis/makePostRequest";
import Loader from "../loader/Loader";
import { popErrorToast, popToast } from "../toasts/toast";
import CardOptionDropdown from "./CardOptionDropdown";

const Card = ({ cardData }) => {
  const dispatch = useDispatch();
  const [cardOptionDropDown, setCardOptionDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const openedChecklist = useSelector((store) => store.task.openedChecklist);
  const user = useSelector((store) => store.user.data);
  const buttons = removeElementFromArray(sections, cardData.section);

  const cardOptionsRef = useClickOutSide(() => {
    setCardOptionDropDown(false);
  });

  const trueCheckLists = cardData.checklists.filter(
    (checklist) => checklist.isDone === true
  );

  async function changeSection(section) {
    const updatedTask = await makePostRequest(
      `${backendUrl}/api/v1/task/edit/${cardData._id}`,
      {
        taskData: {
          section,
          user: user._id,
          priority: cardData.priority,
          title: cardData.title,
          dueDate: cardData.dueDate ? cardData.dueDate : undefined,
        },
      }
    );

    setLoading(false);

    dispatch(
      closeChecklist({
        section: cardData.section,
        id: cardData._id,
      })
    );

    if (updatedTask.sucess) {
      dispatch(deleteTask({ section: cardData.section, taskId: cardData._id }));
      dispatch(
        addTask({
          section: updatedTask.data.section,
          newTask: updatedTask.data,
        })
      );
      popToast(`Task moved to ${updatedTask.data.section}`);
    } else {
      popErrorToast(updatedTask.message);
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.priority}>
        <Priority priority={cardData.priority} />
        <div className={styles.cardOptions} ref={cardOptionsRef}>
          <BsThreeDots
            size={"1.5rem"}
            onClick={() => setCardOptionDropDown(!cardOptionDropDown)}
            className={styles.threeDots}
          />
          {cardOptionDropDown && (
            <CardOptionDropdown
              cardData={cardData}
              setCardOptionDropDown={setCardOptionDropDown}
            />
          )}
        </div>
      </div>
      <div className={styles.heading}>
        <h1 className={styles.cardHeading} title={cardData.title}>
          {cardData.title}
        </h1>
      </div>
      <div className={styles.checklist}>
        <div className={styles.checklisyHeading}>
          <h4>
            Checklist ({trueCheckLists.length}/{cardData.checklists.length})
          </h4>
          <div>
            {openedChecklist[cardData.section]?.includes(cardData._id) ? (
              <MdKeyboardArrowUp
                color="#767575"
                size={"1.5rem"}
                onClick={() =>
                  dispatch(
                    closeChecklist({
                      section: cardData.section,
                      id: cardData._id,
                    })
                  )
                }
              />
            ) : (
              <MdKeyboardArrowDown
                color="#767575"
                size={"1.5rem"}
                onClick={() =>
                  dispatch(
                    openChecklist({
                      section: cardData.section,
                      id: cardData._id,
                    })
                  )
                }
              />
            )}
          </div>
        </div>
        <div className={styles.checklists}>
          {openedChecklist[cardData.section]?.includes(cardData._id) &&
            cardData.checklists.map((m) => (
              <DisplayChecklist
                key={m._id}
                taskData={cardData}
                checklistData={m}
              />
            ))}
        </div>
      </div>
      <div className={styles.btns}>
        <div>
          {cardData.dueDate && (
            <DateChip
              complete={cardData.section === "done"}
              due={isDatePassed(cardData.dueDate)}
            >
              {formatDate(cardData.dueDate).monthDay}
            </DateChip>
          )}
        </div>

        <div className={styles.btn}>
          {buttons.map((m) =>
            loading === m ? (
              <SmallBtn key={m}>
                <Loader color={"#767575"} />
              </SmallBtn>
            ) : (
              <SmallBtn
                onClick={() => {
                  setLoading(m);
                  changeSection(m);
                }}
                key={m}
              >
                {formatString(m).toUpperCase()}
              </SmallBtn>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
