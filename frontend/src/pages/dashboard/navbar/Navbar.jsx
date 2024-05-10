import React from "react";
import styles from "./navbar.module.css";
import logo from "../../../assets/logo.svg";
import { MdLogout } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { IoServer } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CircelButton } from "../../../stylesComponents/styles";
import { toggleLogoutModal } from "../../../store/modalSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className={styles.nav}>
      <div>
        <div className={styles.heading}>
          <img src={logo} alt="" />
          <h3>Pro Monage</h3>
        </div>
        <div className={styles.navigation}>
          <NavLink
            to={"/dashboard"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? styles.active : styles.passive
            }
          >
            <MdSpaceDashboard size={"1.5rem"} /> Board
          </NavLink>
          <NavLink
            to={"/analytics"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? styles.active : styles.passive
            }
          >
            <IoServer size={"1.5rem"} /> Analytics
          </NavLink>
          <NavLink
            to={"/settings"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? styles.active : styles.passive
            }
          >
            <IoSettingsSharp  size={"1.5rem"}  />
            Settings
          </NavLink>
        </div>
      </div>
      <div className={styles.bottom}>
        <CircelButton
          outline
          color="red"
          className={styles.logout}
          style={{ border: "2px solid white" }}
          onClick={() => dispatch(toggleLogoutModal())}
        >
          <MdLogout size={"1.5rem"} /> Log out
        </CircelButton>
      </div>
    </nav>
  );
};

export default Navbar;
