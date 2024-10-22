import "./MainScreenLayout.css";
import { Outlet } from "react-router-dom";
import { SideMenu } from "./SideMenu.jsx";
import { Topbar } from "./Topbar.jsx";
// import {Dashboard} from "./main.content/Dashboard"

export function ScreenLayout() {
  return (
    <div className="backgroundUser">
      <Topbar />
      <SideMenu />
      <Outlet />
      <div className="footer">{/* <Footer /> */}</div>
    </div>
  );
}
