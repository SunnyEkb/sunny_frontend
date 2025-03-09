import React from "react";
import styles from "./styles.module.scss";
import arrowBack from "../../../assets/icon/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import WindowChat from "./WindowChat/WindowChat";

export default function ChatPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.chat}>
      <header className={styles.chat__header}>
        <img
          src={arrowBack}
          alt="back"
          className={styles.cardBig__img}
          onClick={handleGoBack}
        />
        <h1 className={styles.chat__headerTitle}>Имя пользователя</h1>
      </header>

      <div className={styles.chat__wrapper}>
        {" "}
        <WindowChat />
      </div>
    </div>
  );
}
