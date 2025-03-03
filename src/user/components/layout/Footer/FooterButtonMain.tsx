import { useNavigate } from "react-router-dom";
import {
  useLazyCheckAuthQuery,
  useLogoutMutation,
} from "../../../../store/auth-api/authApi";
import mockLinkMenu, { mockLogin } from "./constans";
import React from "react";
import style from "./footerMain.module.scss";

export default function FooterButtonMain() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [checkAuth, { isSuccess }] = useLazyCheckAuthQuery();

  React.useEffect(() => {
    checkAuth();
  }, []);

  const handleClick = async (item: (typeof mockLinkMenu)[number]) => {
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
  };

  return (
    <footer className={style.footer}>
      <div className={style.footerList}>
        {mockLinkMenu.map((item) => {
          let blockMenu: typeof item;
          if (!isSuccess && item.id == 5) {
            blockMenu = mockLogin;
          } else {
            blockMenu = item;
          }

          if (item.id == 6 && !isSuccess) {
            return null;
          }
          return (
            <div
              key={blockMenu.id}
              className={style.item}
              onClick={() => handleClick(blockMenu)}
            >
              <img
                src={blockMenu.icon}
                alt={blockMenu.title}
                className={style.linkIcon}
              />
              <div className={style.linkTitle}>{blockMenu.title}</div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
