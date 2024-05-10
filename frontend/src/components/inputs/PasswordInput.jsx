import React, { useState } from "react";
import styles from "./input.module.css";
import { MdLockOutline } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordInput = ({ id, placeholder }) => {
  const [hide, setHide] = useState(true);

  return (
    <div className={styles.input}>
      <MdLockOutline size={"1.5rem"} color="#828282" />
      <input
        id={id}
        type={hide ? "password" : "text"}
        placeholder={placeholder}
      />
      {hide ? (
        <IoEye
          size={"1.5rem"}
          color="#828282"
          onClick={() => setHide((prev) => !prev)}
        />
      ) : (
        <IoEyeOff
          size={"1.5rem"}
          color="#828282"
          onClick={() => setHide((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
