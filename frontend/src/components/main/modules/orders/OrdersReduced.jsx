import "./OrdersReduced.css";
import React, { useEffect, useState } from "react";
import { useOrdersLogic } from "../../../../hooks/useOrdersLogic";
import { useRefreshOnLocalStorage } from "../../../../hooks/useRefreshOnLocalStorage";
import { StatusOrder } from "./StatusOrder";

export const OrdersReduced = () => {
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

  return (
    <div className="orders">
      <table id="orders" style={{ textAlign: "center" }}>
        <thead>
          <tr height="50px" style={{ cursor: "pointer" }}>
            <th
              width="20%"
              onClick={() => requestSort("orderId")}
              className={sortConfig.key === "orderId" ? "sorted" : ""}
            >
              Pedido {getSortArrow("orderId")}
            </th>
            <th
              width="30%"
              onClick={() => requestSort("date")}
              className={sortConfig.key === "date" ? "sorted" : ""}
            >
              Fecha {getSortArrow("date")}
            </th>
            <th
              width="40%"
              onClick={() => requestSort("total")}
              className={sortConfig.key === "total" ? "sorted" : ""}
            >
              Total {getSortArrow("total")}
            </th>
            <th
              width="10%"
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
                <td>{formatTotal(order.total)}</td>
                <td>
                  <StatusOrder status={order.status} />
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
  );
};
