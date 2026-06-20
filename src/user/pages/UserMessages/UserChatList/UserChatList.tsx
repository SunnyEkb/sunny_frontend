import type { ChatDto } from "../../../../shared/api/chatApi";
import ChatItem from "../UserChatItem/ChatItem";
import styles from "./UserChatList.module.scss";

export type ChatList = ChatDto[];

interface Props {
  chatList: ChatList;
  currentUserId: string;
}

const UserChatList = ({ chatList, currentUserId }: Props) =>
  chatList.length ? (
    <ul className={styles.list}>
      {chatList.map((chat) => (
        <ChatItem key={chat.id} chat={chat} currentUserId={currentUserId} />
      ))}
    </ul>
  ) : (
    <h3>У вас нет сообщений</h3>
  );

export default UserChatList;
