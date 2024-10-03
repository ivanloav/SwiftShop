import "./Orders.css";
import React, { useEffect, useState } from "react";
import { useOrdersLogic } from "../../../../hooks/useOrdersLogic";
import { useRefreshOnLocalStorage } from "../../../../hooks/useRefreshOnLocalStorage";
import { StatusOrder } from "./StatusOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { OpenInNewWindow } from "../../../../hooks/openWindow";
import { useOrdersActions } from "../../../../hooks/useOrdersActions";

export const Orders = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "orderId",
    direction: "descending",
  });
  const { data, loading, fetchData } = useOrdersLogic();
  const { handleDelete } = useOrdersActions();

  const handleOpenOrderForm = () => {
    OpenInNewWindow("/neworder");
  };

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

  const requestSort = (key) => {
    let direction = "descending";
    if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTotal = (total) => {
    const fixedTotal = Number(total).toFixed(2);
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

  const getProgressPercentage = (value, total) => {
    if (total === 0) return "0%";
    const percentage = (value / total) * 100;
    return `${Math.min(percentage, 100).toFixed(2)}%`; // Limita el porcentaje a 100%
  };

  return (
    <div className="full-screen">
      {/* Barra de estadísticas con los valores calculados */}
      <div className="stats-bar">
        <div className="create-order-button">
          <button
            className="btnNewOrder btn-primary"
            onClick={handleOpenOrderForm}
            title="Crear nuevo pedido"
          >
            <FontAwesomeIcon icon={faCirclePlus} className="iconNewOrder" />
          </button>
        </div>

        <div className="stat-item">
          <div className="stat-title">Pedidos totales</div>
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{ width: getProgressPercentage(totalOrders, totalOrders) }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Artículos pedidos</div>
          <div className="stat-value">{totalItemsOrdered}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{
                width: getProgressPercentage(totalItemsOrdered, totalOrders),
              }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos recibidos</div>
          <div className="stat-value">{totalReceived}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{
                width: getProgressPercentage(totalReceived, totalOrders),
              }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos en preparación</div>
          <div className="stat-value">{totalProcessing}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{
                width: getProgressPercentage(totalProcessing, totalOrders),
              }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos enviados</div>
          <div className="stat-value">{totalSent}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{ width: getProgressPercentage(totalSent, totalOrders) }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-title">Pedidos entregados</div>
          <div className="stat-value">{totalDelivered}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{
                width: getProgressPercentage(totalDelivered, totalOrders),
              }}
            ></div>
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
                  width="15%"
                  onClick={() => requestSort("orderId")}
                  className={sortConfig.key === "orderId" ? "sorted" : ""}
                >
                  Nº de pedido {getSortArrow("orderId")}
                </th>
                <th
                  width="15%"
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
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      {order.customer ? order.customer.name : "Desconocido"}
                    </td>
                    <td>{formatTotal(order.total)}</td>
                    <td>
                      <StatusOrder status={order.status} />
                    </td>
                    <td>
                      <button
                        className="btn btn-icon"
                        onClick={() =>
                          OpenInNewWindow(`/editorder/${order.orderId}`)
                        }
                        disabled={order.status !== "received"}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-icon cancel"
                        onClick={() => handleDelete(order.orderId)}
                        disabled={order.status !== "received"}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay pedidos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
