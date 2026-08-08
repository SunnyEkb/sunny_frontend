import React from "react";
import styles from "./styles.module.scss";
import Message from "../Message/Message";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { CHATWsSendMessage } from "../../../../store/actions/chat";
import SendIcon from "../../../../assets/icon/send-icon.svg?react";
import PinIcon from "../../../../assets/icon/pin-icon.svg?react";
import { imageValidation, validImageTypes } from "./helpers";
import Notifications from "../../../../shared/notification/Notification";
import  ChatImagePreviews from "./ChatImagePreviews/ChatImagePreviews";

interface Props {
  adId?: string;
  recipientId?: string;
  currentUserId?: string;
}

export default function WindowChat({
  adId,
  recipientId,
  currentUserId,
}: Props) {
  const [value, setValue] = React.useState("");
  const [images, setImages] = React.useState<{id: string, file: File; url: string }[]>([]);
  const [message, setMessage] = React.useState<{
    message: string;
    status: "success" | "error";
  } | null>(null);

  const dispatch = useAppDispatch();

  const { currentMessages } = useAppSelector((state) => state.wsChat);
  const user = useAppSelector((state) => state.auth.user);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > 140 ? "scroll" : "hidden";
  };

  const handleSend = () => {
    const message = value.trim();

    // Устанавливаем новую высоту

    if (!message || !adId || !recipientId || recipientId === currentUserId) {
      return;
    }

    const timestamp = new Date().toISOString();

    dispatch(
      CHATWsSendMessage({
        message,
        event: "message:send",
        ad_id: adId,
        recipient_id: recipientId,
        optimisticMessage: {
          id: -Date.now(),
          message,
          sender_id: String(user?.id ?? ""),
          sender_username: user?.username ?? "",
          avatar: user?.avatar as string | undefined,
          created_at: timestamp,
          updated_at: timestamp,
        },
      }),
    );
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
  };

  const handleDeleteImage = (url: string) => {
    setImages((prev) => prev.filter((image) => image.url !== url));
    URL.revokeObjectURL(url);
  }

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const validFiles = files.filter((file) =>
      imageValidation(file)
        ? file
        : setMessage({
            message: `Неверный формат файла или размер превышает 5\u00A0МБ. \n Допустимый формат изображении: ${validImageTypes
              .reduce((acc: string[], curr: string) => {
                acc.push("." + curr.split("/")[1]);
                return acc;
              }, [])
              .join(", ")}`,
            status: "error",
          }),
    );

    const filesWithPrewiew = validFiles.map((file) => {
      const id = String(Date.now() + Math.random());
      const url = URL.createObjectURL(file);
      return { id, file, url };
    });

    setImages((prev) => [...prev, ...filesWithPrewiew]);

    e.target.value = "";
  };

  return (
    <div className={styles.window}>
      {message && (
        <Notifications messageText={message.message} status={message.status} />
      )}
      <div className={styles.window__listMessage}>
        {!!currentMessages.length &&
          currentMessages.map((item, index) => {
            const formattedDate = formatDate(new Date(item.created_at));
            const prevMess = index > 0 ? currentMessages[index - 1] : null;
            const prevDate = prevMess
              ? formatDate(new Date(prevMess.created_at))
              : null;

            const showDate = index === 0 || formattedDate !== prevDate;

            return (
              <>
                {showDate && (
                  <div className={styles.window__dayTitle}>{formattedDate}</div>
                )}
                <Message key={item.id} message={item} />
              </>
            );
          })}
      </div>

      <div>
        {images.length > 0 && <ChatImagePreviews images={images} onDelete={handleDeleteImage}/>}
        <div className={styles.window__wrapperSendInput}>
          <label className={styles.fileLabel}>
            <input
              type="file"
              multiple
              className={styles.window__inputFiles}
              accept={validImageTypes.join(",")}
              aria-label="Загрузить файлы"
              onChange={handleFilesChange}
            />
            <span
              role="button"
              tabIndex={0}
              className={styles.window__iconButton}
            >
              <PinIcon
                width="20"
                height="20"
                fill="#b2bdc7"
                style={{ transform: "rotate(323deg)" }}
              />
            </span>
          </label>
          <textarea
            ref={textareaRef}
            placeholder="Написать сообщение"
            className={styles.window__textAreaText}
            value={value}
            name="message"
            onChange={(e) => handleChange(e)}
            disabled={!adId || !recipientId || recipientId === currentUserId}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            className={styles.window__sendButton}
            onClick={handleSend}
            disabled={!adId || !recipientId || recipientId === currentUserId}
          >
            <SendIcon width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
}
