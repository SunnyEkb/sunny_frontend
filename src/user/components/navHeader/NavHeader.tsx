import { FC } from 'react';
import styles from './navHeader.module.scss';

const NavHeader: FC = () => {
    return (
        <header className={styles.header}>
            <button className={styles.backButton}>←</button>
            <div className={styles.icons}>
                <button className={styles.icon}>🔔</button>
                <button className={styles.icon}>⚙️</button>
            </div>
        </header>
    );
};

export default NavHeader;
