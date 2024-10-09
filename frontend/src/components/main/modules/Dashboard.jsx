import "./Dashboard.css";
import { Card } from "../ui/Card";
import React, { useEffect, useState } from "react";
import { OrdersReduced } from "./orders/OrdersReduced"; // Ajusta la ruta según sea necesario
import { StatisticsChart } from "./statistics/StatisticsChart"; // Ajusta la ruta según sea necesario
import { getStatisticsDataOrders, getOrders } from "../../../services/api"; // Ajusta la ruta según sea necesario
import { useTopProductsLogic } from "../../../hooks/useTopProductsLogic"; // Ajusta la ruta según sea necesario
import { BaseImgURL } from "../../../config";

export function Dashboard() {
  const [data, setData] = useState({
    received: [],
    processing: [],
    shipped: [],
    delivered: [],
    labels: [],
  });

  const { topProducts, loading: loadingTopProducts } = useTopProductsLogic();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
        setLoadingOrders(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Filtrar los 10 últimos pedidos
  const latestOrders = orders.slice(-10);

  return (
    <div className="mainContent flex">
      <div className="searchBar flex">
        <i className="bi bi-search"></i>
        <span>Search</span>
      </div>
      <hr></hr>
      <div className="boards">
        <Card cardName="Top 4 Productos Más Vendidos">
          <br></br>
          {loadingTopProducts ? (
            <p>Loading...</p>
          ) : topProducts.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            <ul className="product-list">
              {topProducts.map((product) => (
                <li key={product.product_productId} className="product-item">
                  <img
                    src={`${BaseImgURL}${product.product_image}`}
                    alt={product.product_name}
                  />
                  <div className="product-info">
                    <span className="product-price">
                      {product.product_price} €
                    </span>
                    <h2 className="product-name">{product.product_name}</h2>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card cardName="Ventas">
          <div className="StatisticsChart">
            <StatisticsChart data={data} />
          </div>
        </Card>
        <Card cardName="Pedidos">
          {loadingOrders ? (
            <p>Loading...</p>
          ) : (
            <OrdersReduced orders={latestOrders} />
          )}
        </Card>
      </div>
    </div>
  );
}
