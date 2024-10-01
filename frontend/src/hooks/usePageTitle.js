import { useLocation } from "react-router-dom";

export const usePageTitle = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/login":
        return "Iniciar Sesión";
      case "/user/dashboard":
        return "Dashboard";
      case "/user/tienda":
        return "Tienda";
      case "/user/inventario":
        return "Inventario";
      case "/user/clientes":
        return "Clientes";
      case "/user/orders":
        return "Pedidos";
      default:
        return "Default Title";
    }
  };

  return getTitle();
};
