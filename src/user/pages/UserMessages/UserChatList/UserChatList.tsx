import ChatItem, { type Chat} from "../UserChatItem/ChatItem";

import styles from "./UserChatList.module.scss";

export type ChatList = Chat[];

const UserChatList = ({ chatList }: { chatList: ChatList }) =>
  !!chatList.length ? (
    <ul className={styles.list}>
      {chatList.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </ul>
  ) : (
    <h3>У вас нет сообщении</h3>
  );

  export default UserChatList;
