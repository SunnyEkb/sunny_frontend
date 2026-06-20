import React from "react";
import styles from "./styles.module.scss";
import arrowBack from "../../../assets/icon/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import WindowChat from "./WindowChat/WindowChat";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  CHATWsConnect,
  CHATWsDisconnect,
  CHATWsOnMessage,
} from "../../../store/actions/chat";
import { getChat, type ChatDto } from "../../../shared/api/chatApi";
// import { BASE_URL } from "../../../utils/constans";

// export const BASE_URL: string = "wss://sunnyekb.ru/";
export const BASE_URL: string =
  (import.meta.env.VITE_CHAT_API_URL || "https://sunnyekb.ru") ??
  "http://localhost:3000";

export default function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const params = useParams();
  const [loadedChat, setLoadedChat] = React.useState<ChatDto | null>(null);
  const [chatLoadingError, setChatLoadingError] = React.useState<string | null>(
    null,
  );
  const currentUserId = user?.id === undefined ? undefined : String(user.id);
  const recipientIdFromRoute = params.buyer_id
    ? currentUserId === params.owner_id
      ? params.buyer_id
      : params.owner_id
    : params.owner_id;
  const recipientId = loadedChat
    ? loadedChat.sender_id === currentUserId
      ? loadedChat.recipient_id
      : loadedChat.sender_id
    : recipientIdFromRoute;
  const adId = loadedChat?.ad_id ?? params.object_id;
  const handleGoBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    if (user) {
      // const WS_LINK = `${BASE_URL}chat/${params.objectType}/${params.object_id}/${params.buyer_id}/`;
      const WS_LINK = `${BASE_URL}/chat`;
      dispatch(CHATWsConnect({ url: `${WS_LINK}`, token: user.token }));
    }

    return () => {
      dispatch(CHATWsDisconnect());
    };
  }, [dispatch, user]);

  React.useEffect(() => {
    if (!params.id || !user?.token) {
      setLoadedChat(null);
      return;
    }

    let isCancelled = false;
    setChatLoadingError(null);

    getChat(params.id, user.token)
      .then((chat) => {
        if (isCancelled) {
          return;
        }

        setLoadedChat(chat);
        dispatch(
          CHATWsOnMessage(
            [...chat.messages].reverse().map((message) => ({
              id: message.id,
              message: message.text,
              sender_id: message.sender_id,
              created_at: message.date,
              updated_at: message.date,
            })),
          ),
        );
      })
      .catch((error: unknown) => {
        if (!isCancelled) {
          setChatLoadingError(
            error instanceof Error ? error.message : "Не удалось загрузить чат",
          );
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [dispatch, params.id, user?.token]);

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
        {chatLoadingError && <p>{chatLoadingError}</p>}
        <WindowChat
          adId={adId}
          recipientId={recipientId}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}
