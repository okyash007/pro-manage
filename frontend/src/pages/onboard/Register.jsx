import React, { useState } from "react";
import styles from "./onboard.module.css";
import { MdOutlinePersonOutline, MdPassword } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { CircelButton } from "../../stylesComponents/styles";
import { makePostRequest } from "../../apis/makePostRequest";
import { backendUrl } from "../../utils/constants";
import Loader from "../../components/loader/Loader";
import Input from "../../components/inputs/Input";
import PasswordInput from "../../components/inputs/PasswordInput";
import { popErrorToast, popToast } from "../../components/toasts/toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  function changeFormData(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function changeError(key, value) {
    setError((prev) => ({ ...prev, [key]: value }));
  }

  function handleError() {
    if (!formData.name) {
      changeError("name", true);
    } else {
      changeError("name", false);
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      changeError("email", true);
    } else {
      changeError("email", false);
    }
    if (
      formData["password"] !== formData["confirmPassword"] ||
      !formData["confirmPassword"]
    ) {
      changeError("confirmPassword", true);
    } else {
      changeError("confirmPassword", false);
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
        formData.password
      )
    ) {
      changeError("password", true);
    } else {
      changeError("password", false);
    }
  }

  async function handleSubmit() {
    const data = await makePostRequest(`${backendUrl}/api/v1/user/signup`, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (!data.sucess) {
      popErrorToast(data.message);
    } else {
      navigate("/login");
      popToast("Account created");
    }
  }

  return (
    <>
      <h1 className={styles.heading}>Register</h1>
      <form
        className={styles.form}
        onChange={(e) => changeFormData(e.target.id, e.target.value.trim())}
        onSubmit={(e) => {
          e.preventDefault();

          if (Object.values(error).every((value) => value === false)) {
            setLoading(true);
            handleSubmit();
          }
        }}
      >
        <div>
          <Input
            icon={<MdOutlinePersonOutline size={"1.5rem"} color="#828282" />}
            id={"name"}
            placeholder={"Name"}
          />
          {error.name && <p className={styles.error}>Name must be someThing</p>}
        </div>
        <div>
          <Input
            icon={<MdOutlineMail size={"1.5rem"} color="#828282" />}
            id={"email"}
            placeholder={"Email"}
          />
          {error.email && <p className={styles.error}>Not a valid email</p>}
        </div>

        <div>
          <PasswordInput id={"password"} placeholder={"Password"} />
          {error.password && (
            <p className={styles.error}>
              At least 8 characters long and include 1 uppercase letter and 1
              special character (@, #, etc.)
            </p>
          )}
        </div>
        <div>
          <PasswordInput
            id={"confirmPassword"}
            placeholder={"Confirm password"}
          />
          {error.confirmPassword && (
            <p className={styles.error}>It deas'nt match with password</p>
          )}
        </div>
        <div>
          <div className={styles.submitBtn}>
            {loading ? (
              <CircelButton rounded color="#17a2b8">
                <Loader color={"white"} size={"1.25rem"} />
              </CircelButton>
            ) : (
              <CircelButton
                type="submit"
                rounded
                color="#17a2b8"
                onClick={() => {
                  handleError();
                }}
              >
                Register
              </CircelButton>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
