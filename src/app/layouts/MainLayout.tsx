import { Outlet } from "react-router-dom";
import { FooterButtonMain } from "../../user/components/layout";
import style from "./style.module.scss";

interface Props {
  isShowFooter?: boolean;
}

export default function MainLayout({ isShowFooter = true }: Props) {
  return (
    <div className={style.main}>
      <Outlet />
      {isShowFooter && <FooterButtonMain />}
    </div>
  );
}
