import "./Orders.css";
import React, { useEffect, useState } from "react";
//import { getOrders } from "../../../../services/api"; // Importa tu función de obtener órdenes desde api.js
import { useOrdersLogic } from "../../../../hooks/useOrdersLogic";
import { useRefreshOnLocalStorage } from "../../../../hooks/useRefreshOnLocalStorage";
import { StatusOrder } from "./StatusOrder";

export const Orders = () => {
  // Inicializamos sortConfig con orden descendente por defecto (flecha hacia abajo)
  const [sortConfig, setSortConfig] = useState({
    key: "orderId",
    direction: "descending",
  });
  const { data, loading, fetchData } = useOrdersLogic();

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("orderUpdated") === "true") {
        fetchData();
        localStorage.removeItem("orderUpdated");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchData]);

  useRefreshOnLocalStorage("refreshOrders", fetchData);

  // Función para manejar el ordenamiento
  const requestSort = (key) => {
    let direction = "descending"; // Cambiamos a descendente como valor por defecto
    if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending"; // Alternar a ascendente si ya está en descendente
    }
    setSortConfig({ key, direction });
  };

  // Función para renderizar la flecha de ordenamiento
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return ""; // Flecha hacia abajo por defecto
  };

  // Ordenar los datos basados en el sortConfig
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        return 0;
      })
    : [];

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Añadir cero si es necesario
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0, por eso sumamos 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Formato dd-mm-aaaa
  };

  const formatTotal = (total) => {
    // Asegurar que siempre haya dos decimales
    const fixedTotal = Number(total).toFixed(2);

    // Formatear el número como moneda en euros
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(fixedTotal);
  };

  // Calcular estadísticas
  const totalOrders = sortedData.length;
  const totalItemsOrdered = sortedData.reduce(
    (sum, order) => sum + order.quantity,
    0
  );
  const totalReceived = sortedData.filter(
    (order) => order.status === "received"
  ).length;
  const totalProcessing = sortedData.filter(
    (order) => order.status === "processing"
  ).length;
  const totalDelivered = sortedData.filter(
    (order) => order.status === "delivered"
  ).length;
  const totalSent = sortedData.filter(
    (order) => order.status === "sent"
  ).length;

  return (
    <div className="full-screen">
      {/* Barra de estadísticas con los valores calculados */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-title">Pedidos totales</div>
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Artículos pedidos</div>
          <div className="stat-value">{totalItemsOrdered}</div>
          <div className="stat-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos pendientes de preparar</div>
          <div className="stat-value">{totalReceived}</div>
          <div className="stat-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos en preparación</div>
          <div className="stat-value">{totalProcessing}</div>
          <div className="stat-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos enviados</div>
          <div className="stat-value">{totalSent}</div>
          <div className="stat-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos entregados</div>
          <div className="stat-value">{totalDelivered}</div>
          <div className="stat-bar">
            <div className="progress"></div>
          </div>
        </div>
      </div>

      {/* Tabla de pedidos */}
      <div className="col col-2">
        <div className="orders">
          <table id="orders">
            <thead>
              <tr height="50px" style={{ cursor: "pointer" }}>
                <th
                  width="20%"
                  onClick={() => requestSort("orderId")}
                  className={sortConfig.key === "orderId" ? "sorted" : ""}
                >
                  Nº de pedido {getSortArrow("orderId")}
                </th>
                <th
                  width="20%"
                  onClick={() => requestSort("date")}
                  className={sortConfig.key === "date" ? "sorted" : ""}
                >
                  Fecha {getSortArrow("date")}
                </th>
                <th
                  width="20%"
                  onClick={() => requestSort("customer")}
                  className={sortConfig.key === "customer" ? "sorted" : ""}
                >
                  Cliente {getSortArrow("customer")}
                </th>
                <th
                  width="20%"
                  onClick={() => requestSort("total")}
                  className={sortConfig.key === "total" ? "sorted" : ""}
                >
                  Total {getSortArrow("total")}
                </th>
                <th
                  width="20%"
                  onClick={() => requestSort("status")}
                  className={sortConfig.key === "status" ? "sorted" : ""}
                >
                  Estado {getSortArrow("status")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData && sortedData.length > 0 ? (
                sortedData.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{formatDate(order.created_at)}</td>{" "}
                    {/* Formato dd-mm-aaaa */}
                    <td>{order.customer.name}</td>
                    <td>{formatTotal(order.total)}</td>{" "}
                    {/* Formateo del total en euros */}
                    <td>
                      <StatusOrder status={order.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay pedidos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
