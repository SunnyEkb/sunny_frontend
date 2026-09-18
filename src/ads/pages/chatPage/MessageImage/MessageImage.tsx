import { useEffect, useState } from "react";
import { CHATImageData } from "../../../../store/actions/chat";
import styles from "./styles.module.scss";

type Props = CHATImageData;

function MessageImage({ name, data, mime_type }: Props) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const blob = new Blob([data as BlobPart], {
      type: mime_type,
    });
    const url = URL.createObjectURL(blob);
    setSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [data, mime_type]);

  return (
    <img
      src={src}
      alt={name || "Вложение"}
      className={styles.message__attachedImg}
    />
  );
}

export default MessageImage;
