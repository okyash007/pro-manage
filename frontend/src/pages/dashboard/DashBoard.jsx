import React from "react";
import styles from "./dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DeletModal from "./modal/deletModal/DeletModal";
import LogoutModal from "./modal/logoutModal/LogoutModal";
import Modal from "./modal/taskModal/Modal";
import Navbar from "./navbar/Navbar";

const DashBoard = () => {
  const allModals = useSelector((store) => store.modal);

  return (
    <div className={styles.screen}>
      <Navbar />
      {allModals.taskModal.isOpen && <Modal />}
      {allModals.deletModal.isOpen && <DeletModal />}
      {allModals.logoutModal && <LogoutModal />}
      <Outlet />
    </div>
  );
};

export default DashBoard;
