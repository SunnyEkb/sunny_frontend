import React from "react";
import styles from "./userProfile.module.scss";
import Avatar from "../avatar/Avatar";
import { AvatarType } from "../../../store/slices/authSlice";

interface UserProfileProps {
  name?: string;
  accountType?: string;
  rating?: number;
  reviewsCount?: number;
  avatarUrl?: AvatarType;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  accountType,
  rating,
  reviewsCount,
  avatarUrl,
}) => {
  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <article className={styles.userProfile}>
      <header className={styles.header}>
        <Avatar avatarUrl={avatarUrl} initial={initial} altText={`${name}'s Avatar`} />
        <h2 className={styles.name}>{name}</h2>
      </header>
      <section className={styles.info}>
        <p className={styles.accountType}>{accountType}</p>
        <div className={styles.rating}>
          <span>{rating?.toFixed(1)}</span>
          <span aria-label="Rating">★★★★★</span>
        </div>
        <a href="#" className={styles.reviews} aria-label="User reviews">
          {reviewsCount} отзывов
        </a>
      </section>
    </article>
  );
};

export default UserProfile;
