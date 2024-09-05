import React from "react";
import { Outlet } from "react-router-dom";
// import { FooterButtonMain } from "../../user/components/layout";
import style from './style.module.scss'

export default function MainLayout() {
  return (
    <div className={style.main}>
      <Outlet />
      {/* <FooterButtonMain /> */}
    </div>
  );
}
