import React from "react";
import styles from "./styles.module.scss";
import arrowBack from "../../../assets/icon/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import WindowChat from "./WindowChat/WindowChat";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  CHATWsConnect,
  CHATWsConnecting,
  CHATWsDisconnect,
} from "../../../store/actions/chat";
// import { BASE_URL } from "../../../utils/constans";

// export const BASE_URL: string = "wss://sunnyekb.ru/";
export const BASE_URL: string = "http://localhost:3000/";


export default function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const params = useParams();
  const handleGoBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    if (user) {
      // const WS_LINK = `${BASE_URL}chat/${params.objectType}/${params.object_id}/${params.buyer_id}/`;
       const WS_LINK = `${BASE_URL}chat`;
      dispatch(CHATWsConnect({url: `${WS_LINK}`, token: user.token}));
    }

    return () => {
      dispatch(CHATWsDisconnect());
    };
  }, [dispatch, user]);
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
