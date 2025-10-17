import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./confirmEmail.module.scss";
import { paths } from "../../../app/paths";
import AuthPageLayout from "../../layout/authPageLayout/AuthPageLayout";
import { useAppSelector } from "../../../store/store";

const ConfirmEmail: FC = () => {

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);

  const userProfile = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // Если отсчет дошел до нуля, перенаправляем на страницу авторизации
    if (countdown === 0) {
      navigate(paths.auth);
      return;
    }

    // Устанавливаем таймер
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <AuthPageLayout
      title="Подтверждение почты"
      onGoBack={() => {
        navigate(paths.auth);
      }}
    >
      <p className={styles.confirmEmail_article}>На указанный при регистрации адрес {userProfile?.email} отправлена ссылка для подтверждения почты.</p>
      <p className={styles.confirmEmail_article}>Если письмо не приходит, проверьте папку «Спам» в своей почте.</p>
      <p className={styles.confirmEmail_article}>Срок действия ссылки — 24 часа.</p>
      <p className={styles.confirmEmail_innerText}>
        Вы будете автоматически перенаправлены на страницу входа через {countdown} секунд.
      </p>

    </AuthPageLayout>
  )
}

export default ConfirmEmail;
