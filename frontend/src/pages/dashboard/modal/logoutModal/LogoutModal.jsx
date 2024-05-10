import React, { useState } from "react";
import styles from "../taskModal/modal.module.css";
import { useDispatch } from "react-redux";
import { toggleLogoutModal } from "../../../../store/modalSlice";
import { useClickOutSide } from "../../../../utils/hooks/useClickOutside";
import { CircelButton } from "../../../../stylesComponents/styles";
import { makeGetRequest } from "../../../../apis/makeGetRequest";
import { backendUrl } from "../../../../utils/constants";
import { popToast } from "../../../../components/toasts/toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../../store/userSlice";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutRef = useClickOutSide(() => {
    dispatch(toggleLogoutModal());
  });

  function logout() {
    localStorage.removeItem("acess_token");
    popToast("user logged out");
    dispatch(setUser(null));
    dispatch(toggleLogoutModal());
    navigate("/login", { replace: true });
  }

  return (
    <div className={styles.bg}>
      <div className={styles.logoutModal} ref={logoutRef}>
        <h4>Are you sure you want to Logout?</h4>

        <CircelButton
          color="#17A2B8"
          onClick={() => {
            logout();
          }}
        >
          Yes, Logout
        </CircelButton>

        <CircelButton
          outline
          color="#CF3636"
          onClick={() => dispatch(toggleLogoutModal())}
        >
          Cancel
        </CircelButton>
      </div>
    </div>
  );
};

export default LogoutModal;
