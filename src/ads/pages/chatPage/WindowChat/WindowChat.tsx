import React from "react";
import styles from "./styles.module.scss";
import Message from "../Message/Message";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  CHATWsOnMessage,
  CHATWsSendMessage,
} from "../../../../store/actions/chat";
import Camera from "../../../../assets/icon/camera.svg?react";

const mockMessage = [
  {
    id: "1",
    text: "Hello world!",
    avatar: undefined,
    time: "03:01",
    read: false,
  },

  {
    id: "2",
    text: "Hello world! Hello world!  Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
    avatar: undefined,
    time: "03:01",
    read: false,
  },
];

export default function WindowChat() {
  const [value, setValue] = React.useState("");
  const today: Date = new Date("2024-10-05");
  const dispatch = useAppDispatch();
  const { currentMessages } = useAppSelector((state) => state.wsChat);

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
    dispatch(CHATWsSendMessage({ message: value }));
    setValue("");
  };

  return (
    <div className={styles.window}>
      <div className={styles.window__dayTitle}>{formattedDate}</div>

      <div className={styles.window__listMessage}>
        {currentMessages.map((item) => {
          if (Array.isArray(item)) {
            return null;
          }
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
