import UserChatList, { type ChatList } from "./UserChatList/UserChatList";
import Avatar from "../../../assets/Avatar.svg";

import styles from "./UserMessages.module.scss";

const mockData: ChatList = Array.from({ length: 5 }, (_, id) => {
  const isUser = Math.random() > 0.5 ? "user" : "companion";

  return {
    id,
    user: {
      name: "Иван",
      avatar: Avatar,
      isOnline: Math.random() > 0.5 ? true : false,
    },
    item: {
      title: "Автомобильный коврик",
      price: 1000,
      imageUrl: "https://ir.ozone.ru/s3/multimedia-7/6447017695.jpg",
    },
    lastMessage: {
      text: "Ещё не продали?",
      createdAt: new Date().toISOString(),
      from: isUser,
      isRead: isUser === "user" ? (Math.random() > 0.5 ? true : false) : null,
    },
  };
});

const UserMessages = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Сообщения</h1>
      <UserChatList chatList={mockData} />
    </div>
  );
};

export default UserMessages;
