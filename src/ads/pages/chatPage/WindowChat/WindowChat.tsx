import React from "react";
import styles from "./styles.module.scss";
import Message from "../Message/Message";
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
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              width="16.000000"
              height="16.000000"
              fill="none"
            >
              {" "}
              <rect
                id="camera"
                width="16.000000"
                height="16.000000"
                x="0.000000"
                y="0.000000"
                fill="rgb(255,255,255)"
                fill-opacity="0"
              />{" "}
              <path
                id="Vector"
                d="M14.9429 13.6095C14.6928 13.8595 14.3537 14 14.0001 14L2.00008 14C1.64646 14 1.30732 13.8595 1.05727 13.6095C0.807224 13.3594 0.666748 13.0203 0.666748 12.6667L0.666748 5.33333C0.666748 4.97971 0.807224 4.64057 1.05727 4.39052C1.30732 4.14048 1.64646 4 2.00008 4L4.66675 4L6.00008 2L10.0001 2L11.3334 4L14.0001 4C14.3537 4 14.6928 4.14048 14.9429 4.39052C15.1929 4.64057 15.3334 4.97971 15.3334 5.33333L15.3334 12.6667C15.3334 13.0203 15.1929 13.3594 14.9429 13.6095Z"
                fill-rule="nonzero"
                stroke="rgb(178,189,199)"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />{" "}
              <path
                id="Vector"
                d="M7.99992 11.3333C6.52716 11.3333 5.33325 10.1394 5.33325 8.66667C5.33325 7.19391 6.52716 6 7.99992 6C9.47268 6 10.6666 7.19391 10.6666 8.66667C10.6666 10.1394 9.47268 11.3333 7.99992 11.3333Z"
                stroke="rgb(178,189,199)"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />{" "}
            </svg>
          </span>
        </label>
      </div>
    </div>
  );
}
