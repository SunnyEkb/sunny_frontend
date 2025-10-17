/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { paths } from "../../../app/paths";
import { useVerifyRegistrationMutation } from "../../../store/auth-api/authApi";

export default function RegisterActivatePage() {
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const [verifyRegistration] = useVerifyRegistrationMutation();

  const handleVerifyUser = async (token: string) => {
    await verifyRegistration({ token: token })
      .unwrap()
      .then(() => {
        setNotification("Пользователь был успешно активирован");
        navigate(paths.auth);
      })
      .catch((e) => {
        setNotification("Произошла ошибка при активации пользователя");
        console.error(e);
      });
  };

  React.useEffect(() => {
    if (!token) {
      navigate(paths.auth);
    } else {
      handleVerifyUser(token);
    }
  }, []);

  return (
    <div className={style.section}>
      <div>Идет активаиция аккаунта...</div>
      {notification && <div>{notification}</div>}
    </div>
  );
}
