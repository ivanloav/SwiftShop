import "./Topbar.css";
import { usePageTitle } from "../../../hooks/usePageTitle"; // Importar el hook
import { handleLogout } from "../../../hooks/chechAuth"; // Importar la función de logout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // ícono de salida

export function Topbar() {
  const title = usePageTitle(); // Usar el hook para obtener el título

  return (
    <div className="head flex">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="title flex">{title}</div>
      <div className="configButtons flex">
        <i className="bi bi-gear-fill"></i>
        <i className="bi bi-bell-fill"></i>
        <i className="bi bi-chat-fill"></i>
        <button className="btn btn-light logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </button>
      </div>
    </div>
  );
}
