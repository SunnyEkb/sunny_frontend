import React from 'react';
import styles from './userProfile.module.scss';

interface UserProfileProps {
    name: string;
    accountType: string;
    rating: number;
    reviewsCount: number;
    avatarUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, accountType, rating, reviewsCount, avatarUrl }) => {

  const initial = name ? name.charAt(0).toUpperCase() : '';

    return (
        <div className={styles.userProfile}>
            {/* <div className={styles.avatar}>И</div> */}
            <div className={styles.avatar}>
                {avatarUrl ? (
                    <img src={avatarUrl} alt="User Avatar" className={styles.avatarImage} />
                ) : (
                    <span className={styles.avatarInitial}>{initial}</span>
                )}
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.accountType}>{accountType}</p>
                <div className={styles.rating}>
                    <span>{rating.toFixed(1)}</span>
                    <span>★★★★★</span>
                </div>
                <a className={styles.reviews}>{reviewsCount} отзывов</a>
            </div>
        </div>
    );
};

export default UserProfile;
