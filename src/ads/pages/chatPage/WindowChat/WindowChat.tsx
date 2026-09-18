import React from "react";
import styles from "./styles.module.scss";
import Message from "../Message/Message";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  CHATImageData,
  CHATSendMessageImagePayload,
  CHATSendMessagePayload,
  CHATWsSendMessage,
  CHATWsSendMessageImage,
} from "../../../../store/actions/chat";
import SendIcon from "../../../../assets/icon/send-icon.svg?react";
import PinIcon from "../../../../assets/icon/pin-icon.svg?react";
import { imageValidation, validImageTypes } from "./helpers";
import Notifications from "../../../../shared/notification/Notification";
import ChatImagePreviews from "./ChatImagePreviews/ChatImagePreviews";

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
  const [message, setMessage] = React.useState("");
  const [images, setImages] = React.useState<
    { id: string; file: File; url: string }[]
  >([]);
  const [toast, setToast] = React.useState<{
    message: string;
    status: "error";
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
    setMessage(e.currentTarget.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > 140 ? "scroll" : "hidden";
  };

  const handleSend = async () => {
    try {
      const messageTrimmed = message.trim();

      if (
        (!messageTrimmed && !images.length) ||
        !adId ||
        !recipientId ||
        recipientId === currentUserId
      ) {
        return;
      }

      const timestamp = new Date().toISOString();
      const data: CHATSendMessagePayload | CHATSendMessageImagePayload = {
        message: messageTrimmed,
        event: images.length ? "message:image:send" : "message:send",
        ad_id: adId,
        recipient_id: recipientId,

        optimisticMessage: {
          id: -Date.now(),
          message: messageTrimmed,
          sender_id: String(user?.id ?? ""),
          sender_username: user?.username ?? "",
          avatar: user?.avatar as string | undefined,
          created_at: timestamp,
          updated_at: timestamp,
        },
      };

      if (images.length) {
        const arrayBuffers = await Promise.all(
          images.map(({ file }) => file.arrayBuffer()),
        );

        const imagesData: CHATImageData[] = images.map(({ file }, index) => ({
          name: file.name,
          mime_type: file.type as `image/${string}`,
          data: arrayBuffers[index], // Достаем соответствующий буфер по индексу
        }));

        const imageDataPayload: CHATSendMessageImagePayload = {
          ...data,
          event: "message:image:send",
          images: imagesData,
        };
        dispatch(CHATWsSendMessageImage(imageDataPayload));
        setImages([]);
      } else {
        dispatch(CHATWsSendMessage(data));
      }

      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.overflowY = "hidden";
      }
    } catch (e) {
      setToast({ message: "Возникла какая-то ошибка", status: "error" });
    }
  };

  const handleDeleteImage = (url: string) => {
    setImages((prev) => prev.filter((image) => image.url !== url));
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const validFiles = files.filter((file) =>
      imageValidation(file)
        ? file
        : setToast({
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
      {toast && (
        <Notifications messageText={toast.message} status={toast.status} />
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
              <React.Fragment key={item.id}>
                {showDate && (
                  <div className={styles.window__dayTitle}>{formattedDate}</div>
                )}
                <Message key={item.id} message={item} images={item.images} />
              </React.Fragment>
            );
          })}
      </div>

      <div>
        {images.length > 0 && (
          <ChatImagePreviews images={images} onDelete={handleDeleteImage} />
        )}
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
            value={message}
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
