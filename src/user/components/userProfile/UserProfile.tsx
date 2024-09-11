import React from "react";
import styles from "./userProfile.module.scss";

interface UserProfileProps {
  name?: string;
  accountType?: string;
  rating?: number;
  reviewsCount?: number;
  avatarUrl?: string;
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
        <div className={styles.avatar}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name}'s Avatar`}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarInitial}>{initial}</span>
          )}
        </div>
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
