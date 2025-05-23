import React from "react";
import styles from "./styles.module.scss";
import Message from "../Message/Message";
import camera from "../../../../assets/icon/camera.svg";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  CHATWsOnMessage,
  CHATWsSendMessage,
} from "../../../../store/actions/chat";

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
  const { chat } = useAppSelector((state) => state.wsChat);

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
    dispatch(CHATWsSendMessage({ text: value }));
    setValue("");
  };

  return (
    <div className={styles.window}>
      <div className={styles.window__dayTitle}>{formattedDate}</div>

      <div className={styles.window__listMessage}>
        <Message message={mockMessage[0]} />
        <Message message={mockMessage[1]} />
      </div>

      <div className={styles.window__wrapperSendInput}>
        <input
          placeholder="Написать сообщение"
          className={styles.window__input}
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

        <img
          src={camera}
          alt="button"
          className={styles.window__iconButton}
          onClick={() => handleSend()}
        />
      </div>
    </div>
  );
}
