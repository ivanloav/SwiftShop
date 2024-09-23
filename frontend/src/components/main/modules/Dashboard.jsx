import "./Dashboard.css"
import {Card} from "../ui/Card"

export function Dashboard(){
    return (
      <div className="mainContent flex">
        <div className="searchBar flex">
          <i className="bi bi-search"></i>
          <span>Search</span>
        </div>
        <hr></hr>
        <div className="boards">
          <Card cardName="Tienda" />
          <Card cardName="Ventas" />
          <Card cardName="Pedidos" />
        </div>
      </div>
    );
}

