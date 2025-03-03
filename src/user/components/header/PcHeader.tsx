import styles from "./pcHeader.module.scss";

export default function PcHeader() {
  return (
    <header className={styles.pcHeader}>
      <h1 className={styles.title}>Солнечный Екб</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="/">Главная</a></li>
          <li className={styles.navItem}><a href="/catalog">Каталог</a></li>
          <li className={styles.navItem}><a href="/about">О нас</a></li>
          <li className={styles.navItem}><a href="/contact">Контакты</a></li>
        </ul>
      </nav>
    </header>
  );
}
