import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../../store/auth-api/authApi";
import mockLinkMenu from "./constans";

export default function FooterButtonMain() {

  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleClick = async (item: typeof mockLinkMenu[number]) => {
    if (item.action === "logout") {
      try {
        await logout().unwrap();
        navigate(item.link);
      } catch (error) {
        console.error("Возникла ошибка:", error);
      }
    } else if (item.link) {
      navigate(item.link);
    }
  }

  return (
    <footer className={style.footer}>
      <div className={style.footerList}>
        {mockLinkMenu.map((item) => {
          return (
            <div
              key={item.id}
              className={style.item}
              onClick={() => handleClick(item)}
            >
              <img
                src={item.icon}
                alt={item.title}
                className={style.linkIcon}
              />
              <div className={style.linkTitle}>{item.title}</div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
