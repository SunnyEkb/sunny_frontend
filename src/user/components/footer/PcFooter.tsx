import React from 'react';
import telegram from "../../../assets/icon/Telegram.svg";
import vk from "../../../assets/icon/VK.svg";
import email from "../../../assets/icon/Email.svg";
import styles from './pcFooter.module.scss';

export default function PcFooter() {
  return (
    <footer className={styles.catalog__footer}>
      <div className={styles.catalog__footerContent}>
        <div className={styles.catalog__footerMain}>
          <ul className={styles.catalog__footerLinks}>
            <li><a href="mailto:solnechniy_ekb@mail.ru" className={styles.catalog__footerLinkEmail}>Служба поддержки</a></li>
            <li><div className={styles.catalog__footerLink}>Политика конфиденциальности</div></li>
            <li><div className={styles.catalog__footerLink}>Контакты</div></li>
          </ul>
          <div className={styles.catalog__footerSocial}>
            <img src={telegram} alt="телеграм" className={styles.catalog__footerSocialImg} />
            <img src={vk} alt="вк" className={styles.catalog__footerSocialImg}/>
            <a href="mailto:solnechniy_ekb@mail.ru">
              <img src={email} alt="почта" className={styles.catalog__footerSocialImg}/>
            </a>
          </div>
        </div>
        <div className={styles.catalog__footerInfo}>© «Солнечный Екб», 2024</div>
      </div>
    </footer>
  );
}
