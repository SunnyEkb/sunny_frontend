/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import telegram from "../../../assets/icon/Telegram.svg";
import vk from "../../../assets/icon/VK.svg";
import email from "../../../assets/icon/Email.svg";
import styles from './pcFooter.module.scss';
import { paths } from '../../../app/paths';

const PcFooter:FC = () => {

  const date = new Date().getFullYear();

  return (
    <footer className={styles.catalog__footer}>
      <div className={styles.catalog__footerContent}>
        <div className={styles.catalog__footerMain}>
          <ul className={styles.catalog__footerLinks}>
            <li><a href="mailto:solnechniy_ekb@mail.ru" className={styles.catalog__footerLinkEmail}>Служба поддержки</a></li>
            <li><Link to={paths.policy} className={styles.catalog__footerLink}>Политика конфиденциальности</Link></li>
            <li><a href='#' className={styles.catalog__footerLink}>Контакты</a></li>
          </ul>
          <div className={styles.catalog__footerSocial}>
            <img src={telegram} alt="телеграм" className={styles.catalog__footerSocialImg} />
            {/* <img src={vk} alt="вк" className={styles.catalog__footerSocialImg}/> */}
            <a href="mailto:solnechniy_ekb@mail.ru">
              <img src={email} alt="почта" className={styles.catalog__footerSocialImg}/>
            </a>
          </div>
        </div>
        <div className={styles.catalog__footerInfo}>© «Солнечный Екб», {date}</div>
      </div>
    </footer>
  );
}

export default PcFooter;
