import { Outlet } from "react-router-dom";
import { FooterButtonMain } from "../../user/components/layout";

export default function MainLayout() {
  return (
    <div>
      <Outlet />
      {/* <FooterButtonMain /> */}
    </div>
  );
}
