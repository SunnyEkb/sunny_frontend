import React from 'react';
import styles from './pcFooter.module.scss';
import telegram from "../../../assets/icon/Telegram.svg";
import vk from "../../../assets/icon/VK.svg";
import email from "../../../assets/icon/Email.svg";

export default function PcFooter() {
  return (
    <footer className={styles.catalog__footer}>
      <div className={styles.catalog__footerLinks}>
        {/* <div className={styles.catalog__footerLink}>Новости</div> */}
        <div className={styles.catalog__footerLink}>Служба поддержки</div>
        <div className={styles.catalog__footerLink}>Политика конфиденциальности</div>
        <div className={styles.catalog__footerLink}>Контакты</div>
      </div>
      <div className={styles.catalog__footerSocial}>
        <img src={telegram} alt="телеграм" className={styles.catalog__footerSocialImg} />
       {/*  <img src={vk} alt="вк" className={styles.catalog__footerSocialImg}/> */}
        <img src={email} alt="почта" className={styles.catalog__footerSocialImg}/>
      </div>
      <div className={styles.catalog__footerInfo}>© «Солнечный Екб», 2024</div>
    </footer>
  );
}
