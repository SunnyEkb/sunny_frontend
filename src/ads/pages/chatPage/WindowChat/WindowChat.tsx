import React from "react";
import styles from "./styles.module.scss";
import Message from "../Message/Message";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { CHATWsSendMessage } from "../../../../store/actions/chat";
import Camera from "../../../../assets/icon/camera.svg?react";
import { useParams } from "react-router-dom";

export default function WindowChat() {
  const [value, setValue] = React.useState("");
  const today: Date = new Date();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentMessages } = useAppSelector((state) => state.wsChat);
  const user = useAppSelector((state) => state.auth.user);

  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  }

  const formattedDate = formatDate(today);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  };

  const handleSend = () => {
    const message = value.trim();

    if (!message) {
      return;
    }

    const timestamp = new Date().toISOString();

    dispatch(
      CHATWsSendMessage({
        message,
        event: "message:send",
        ad_id: params.object_id,
        recipient_id: params.buyer_id,
        optimisticMessage: {
          id: -Date.now(),
          message,
          sender_username: user?.username ?? "",
          avatar: user?.avatar as string | undefined,
          created_at: timestamp,
          updated_at: timestamp,
        },
      }),
    );
    setValue("");
  };

  return (
    <div className={styles.window}>
      <div className={styles.window__dayTitle}>{formattedDate}</div>

      <div className={styles.window__listMessage}>
        {currentMessages.map((item) => {
          return <Message key={item.id} message={item} />;
        })}
      </div>

      <div className={styles.window__wrapperSendInput}>
        <input
          placeholder="Написать сообщение"
          className={styles.window__inputText}
          value={value}
          name="message"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <label className={styles.fileLabel}>
          <input
            type="file"
            multiple
            className={styles.window__inputFiles}
            aria-label="Загрузить файлы"
          />
          <span
            role="button"
            tabIndex={0}
            className={styles.window__iconButton}
          >
            <Camera color="rgb(178,189,199)" />
          </span>
        </label>
      </div>
    </div>
  );
}
