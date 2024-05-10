import React, { useEffect } from "react";
import styles from "./onboard.module.css";
import { CircelButton } from "../../stylesComponents/styles";
import Banner from "../../assets/banner.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/login");
    }
  }, [location.pathname]);

  return (
    <main className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.imgBox}>
          <div className={styles.img}></div>
          <img src={Banner} alt="banner image here" />
        </div>
        <div className={styles.subHeadings}>
          <h2>Welcome aboard my friend</h2>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.content}>
          <Outlet />
          <div className={styles.text}>
            <p>
              {location.pathname == "/login"
                ? "Have no account yet?"
                : "Have an account ?"}
            </p>
          </div>
          <Link
            className={styles.link}
            to={location.pathname == "/login" ? "/register" : "/login"}
          >
            <CircelButton outline rounded color="#17a2b8">
              {location.pathname == "/login" ? "Register" : "Login"}
            </CircelButton>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Onboard;
