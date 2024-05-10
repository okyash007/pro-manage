import React, { useState } from "react";
import styles from "./settings.module.css";
import { MdLockOutline, MdOutlinePersonOutline } from "react-icons/md";
import { CircelButton } from "../../../stylesComponents/styles";
import Loader from "../../../components/loader/Loader";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { popErrorToast, popToast } from "../../../components/toasts/toast";
import PasswordInput from "../../../components/inputs/PasswordInput";
import Input from "../../../components/inputs/Input";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);
  const [formData, setFormData] = useState({ name: user.name });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  function changeFormData(key, value) {
    if (value === "") {
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        delete updatedData[key];
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  }

  function changeError(key, value) {
    setError((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    const data = await makePostRequest(
      `${backendUrl}/api/v1/user/edit`,
      formData
    );

    setLoading(false);
    if (data.sucess) {
      dispatch(setUser(data.data));
      popToast("user updated");
    } else {
      popErrorToast(data.message);
    }
  }

  function handleError() {

    if (formData.name && !formData.newPassword) {
      changeError("newPassword", false);
    } else if (
      formData.newPassword &&
      isPasswordValid(formData.newPassword) &&
      formData.oldPassword
    ) {
      isPasswordValid(formData.newPassword);
      changeError("newPassword", false);
    } else {
      changeError("newPassword", true);
    }
  }
  function isPasswordValid(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
      password
    );
  }

  return (
    <main className={styles.main}>
      <h1>settings</h1>
      <form
        className={styles.form}
        onChange={(e) => changeFormData(e.target.id, e.target.value)}
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
            placeholder={"Name"}
            id={"name"}
            icon={<MdOutlinePersonOutline size={"1.5rem"} color="#828282" />}
            value={formData.name}
          />
          {error.name && <p className={styles.error}>Name must be something</p>}
        </div>
        <div>
          <PasswordInput id={"oldPassword"} placeholder={"Old Password"} />
        </div>
        <div>
          <PasswordInput id={"newPassword"} placeholder={"New Password"} />
          {error.newPassword && (
            <p className={styles.error}>
              At least 8 characters long and include 1 uppercase letter and 1 special character (@, #, etc.)
            </p>
          )}
        </div>
        <div>
          <div className={styles.submitBtn}>
            <CircelButton
              type="submit"
              rounded
              color="#17a2b8"
              onClick={() => {
                handleError();
              }}
            >
              {loading ? <Loader size={"1.25rem"} color={"white"} /> : "Update"}
            </CircelButton>
          </div>
          {error.form && <p className={styles.error}>{error.form}</p>}
        </div>
      </form>
    </main>
  );
};

export default Settings;
