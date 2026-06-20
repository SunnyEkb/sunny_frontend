import { useEffect, useState } from "react";
import { getUserChats, type ChatDto } from "../../../shared/api/chatApi";
import { useAppSelector } from "../../../store/store";
import UserChatList from "./UserChatList/UserChatList";
import styles from "./UserMessages.module.scss";

const UserMessages = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [chats, setChats] = useState<ChatDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token) {
      setChats([]);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    getUserChats(user.token)
      .then((data) => {
        if (!isCancelled) {
          setChats(data);
        }
      })
      .catch((requestError: unknown) => {
        if (!isCancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить чаты",
          );
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [user?.token]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Сообщения</h1>
      {isLoading && <p>Загружаем чаты…</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && user && (
        <UserChatList chatList={chats} currentUserId={String(user.id)} />
      )}
    </div>
  );
};

export default UserMessages;
