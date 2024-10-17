import { FC } from "react";
import styles from "./avatar.module.scss"
import camera from "../../../assets/icon/camera.svg"

interface AvatarProps {
  avatarUrl?: string | File | null;
  initial?: string;
  altText?: string;
  editable?: boolean;
  onAvatarChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Avatar: FC<AvatarProps> = ({ avatarUrl, initial, altText, editable, onAvatarChange }) => {

  const imageUrl = avatarUrl instanceof File ? URL.createObjectURL(avatarUrl) : avatarUrl || undefined;

  return (
    <div className={styles.avatar}>
      <label className={editable ? styles.editableAvatar : styles.nonEditableAvatar}>
        {avatarUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className={styles.avatarImage}
          />
        ) : (
          <span className={styles.avatarInitial}>{initial}</span>
        )}
        {editable && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              className={styles.avatarInput}
            />
            <img className={styles.avatarIcon_foto} src={camera} alt="camera_icon" />
          </>
        )}
      </label>
    </div>
  );
};

export default Avatar;
