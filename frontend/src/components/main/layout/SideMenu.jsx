import "./SideMenu.css";
import { Link } from "react-router-dom";

export function SideMenu(){
    return (
      <div className="sideMenu">
        <div className="menu">
          <Link to="/user/dashboard" className="no-color-change">
            <div className="item flex">
              <span className="material-symbols-outlined icon">
                space_dashboard
              </span>{" "}
              <div>Tablero</div>
            </div>
          </Link>
          <Link to="/user/tienda" className="no-color-change">
            <div className="item flex">
              <span className="material-symbols-outlined icon">storefront</span>{" "}
              <div>Tienda</div>
            </div>
          </Link>
          <Link to="/user/inventario" className="no-color-change">
          <div className="item flex">
            <i className="bi bi-box-fill icon"></i>
            <div>Inventario</div>
          </div>
          </Link>
           <Link to="/user/tienda" className="no-color-change">
          <div className="item flex">
            <i className="bi bi-people-fill icon"></i>
            <div>Clientes</div>
          </div>
          </Link>
          <hr></hr>
          <div className="item flex disabled">
            <span className="material-symbols-outlined icon">add_comment</span>{" "}
            <div>Feedback</div>
          </div>
        </div>
      </div>
    );
}

