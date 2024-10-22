import "./LoginScreenLayout.css";
import {Hero} from "./Hero"
import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function LoginScreenLayout() {
  //estado para rastrear boton clickado
  const [showButtons, setShowButtons] = useState(true);
  const location = useLocation();

  useEffect(() => {
    //si la ubi es /login o /register, ocultaro botones
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowButtons(false);
    } else {
      setShowButtons(true)
    }
  }, [location.pathname])
    return (
      <div className="background">
        <div className="first-column">
          <Hero />
        </div>

        <div className="second-column">
          {/* mostrar botones solo si showbuttons es true */}
          {showButtons && (
            <div className="login-register-links">
              <Link to="/login"> 
                <button className="btn">Iniciar sesión</button>
              </Link>
              <Link to="/register">
                <button className="btn">Registrarse</button>
              </Link>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    );
}


