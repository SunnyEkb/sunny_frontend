import styles from "./mobileHeader.module.scss";

export default function MobileHeader() {
  return (
    <header className={styles.mobileHeader}>
      <h1 className={styles.title}>Солнечный Екб</h1>
    </header>
  );
}
