import { FC } from "react"
import styles from "./settingsUser.module.scss"
import LayoutUserLK from "../../layout/layoutUserLK/LayoutUserLK"
import { Link } from "react-router-dom"

const SettingsUser:FC = () => {

  return (
    <LayoutUserLK title="Настройки" >
      <article className={styles.settingsUser}>
        <Link className={styles.settingsUser__link} to={"/user_profile_edit"}>Мой профиль</Link>
        <Link className={styles.settingsUser__link} to={""}>Уведомления</Link>
        <Link className={styles.settingsUser__link} to={"/password-change"}>Изменить пароль</Link>
      </article>
    </LayoutUserLK>
  )
}

export default SettingsUser
