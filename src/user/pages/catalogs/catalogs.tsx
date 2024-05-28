import React from "react";
import styles from "./styles.module.scss";
import { mockCatalog } from "./constantsMock";
import CardCatalog from "./CardCatalog/CardCatalog";

import telegram from "../../../assets/icon/Telegram.svg";
import vk from "../../../assets/icon/VK.svg";
import email from "../../../assets/icon/Email.svg";

export default function Catalogs() {
  return (
    <section className={styles.section}>
      <header className={styles.catalog__header}>
        <h1 className={styles.catalog__headerTitle}>Солнечный Екб</h1>
      </header>

      <section className={styles.sectionImg}>
        <div className={styles.img} />
      </section>

      <main className={styles.catalog__content}>
        <div className={styles.catalog__title}>На районе</div>
        <div className={styles.catalog__itemList}>
          {mockCatalog.map((card) => {
            return <CardCatalog key={card.id} card={card} />;
          })}
        </div>
      </main>
      <footer className={styles.catalog__footer}>
        <div className={styles.catalog__footerLinks}>
          <div className={styles.catalog__footerLink}>Новости</div>
          <div className={styles.catalog__footerLink}>Служба поддержки</div>
          <div className={styles.catalog__footerLink}>
            Условия работы сервиса
          </div>
          <div className={styles.catalog__footerLink}>
            Политика конфиденциальности
          </div>
          <div className={styles.catalog__footerLink}>Контакты</div>
        </div>
        <div className={styles.catalog__footerSocial}>
          <img src={telegram} alt="телеграм" className={styles.catalog__footerSocialImg} />
          <img src={vk} alt="вк" className={styles.catalog__footerSocialImg}/>
          <img src={email} alt="почта" className={styles.catalog__footerSocialImg}/>
        </div>
        <div className={styles.catalog__footerInfo}>© «Солнечный Екб», 2024</div>
      </footer>
    </section>
  );
}
