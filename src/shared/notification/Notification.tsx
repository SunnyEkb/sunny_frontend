import style from "./style.module.scss";

interface Props {
  messageText: string;
  status: "success" | "error";
}

export default function Notifications({ messageText, status }: Props) {
  return (
    <div
      className={`${style.notification} ${
        status == "success" ? style.success__message : style.error__message
      }`}
    >
      {messageText}
    </div>
  );
}
