import "./Topbar.css";
import logo from "../../../../public/logo.png";
import { usePageTitle } from "../../../hooks/usePageTitle"; // Importar el hook
import { handleLogout } from "../../../hooks/chechAuth"; // Importar la función de logout

export function Topbar() {
  const title = usePageTitle(); // Usar el hook para obtener el título

  return (
    <div className="head flex">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="title flex">{title}</div>
      <div className="configButtons flex">
        <i className="bi bi-gear-fill"></i>
        <i className="bi bi-bell-fill"></i>
        <i className="bi bi-chat-fill"></i>
        <button className="btn btn-light logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
