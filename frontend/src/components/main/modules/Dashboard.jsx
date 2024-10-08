import "./Dashboard.css";
import { Card } from "../ui/Card";
import React, { useEffect, useState } from "react";
import { OrdersReduced } from "./orders/OrdersReduced"; // Ajusta la ruta según sea necesario
import { StatisticsChart } from "./statistics/StatisticsChart"; // Ajusta la ruta según sea necesario
import { getStatisticsDataOrders } from "../../../services/api"; // Ajusta la ruta según sea necesario

export function Dashboard() {
  const [data, setData] = useState({
    received: [],
    processing: [],
    shipped: [],
    delivered: [],
    labels: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statisticsData = await getStatisticsDataOrders();
        setData(statisticsData);
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mainContent flex">
      <div className="searchBar flex">
        <i className="bi bi-search"></i>
        <span>Search</span>
      </div>
      <hr></hr>
      <div className="boards">
        <Card cardName="Productos">
          <p>Información sobre productos</p>
        </Card>
        <Card cardName="Ventas">
          <StatisticsChart data={data} />
        </Card>
        <Card cardName="Pedidos">
          <OrdersReduced />
        </Card>
      </div>
    </div>
  );
}
