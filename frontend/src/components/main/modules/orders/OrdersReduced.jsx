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

  const stateTranslations = {
    received: "recibido",
    processing: "en proceso",
    shipped: "enviado",
    delivered: "entregado",
    // Añade más estados según sea necesario
  };

  // Asignamos un valor de prioridad para ordenar los estados
  const statusOrder = {
    recibido: 1,
    "en proceso": 2,
    enviado: 3,
    entregado: 4,
  };

  // Filtrar primero los 10 últimos pedidos (sin ordenar)
  const latestOrdersUnsorted = Array.isArray(data) ? data.slice(-10) : [];

  // Ordenar los 10 últimos pedidos según el `sortConfig`
  const sortedData = latestOrdersUnsorted.sort((a, b) => {
    let aValue, bValue;

    if (sortConfig.key === "customer") {
      aValue = a.customer?.name || "";
      bValue = b.customer?.name || "";
    } else if (sortConfig.key === "status") {
      // Utiliza el valor traducido en español para obtener la prioridad
      aValue = statusOrder[stateTranslations[a.status]] || 0;
      bValue = statusOrder[stateTranslations[b.status]] || 0;
    } else if (sortConfig.key === "total") {
      // Asegura que total se maneje como un número
      aValue = parseFloat(a.total);
      bValue = parseFloat(b.total);
    } else if (sortConfig.key === "date" || sortConfig.key === "created_at") {
      // Ordenar por fecha
      aValue = new Date(a.created_at);
      bValue = new Date(b.created_at);
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    // Comparación para `status` usando el valor de prioridad
    if (sortConfig.key === "status") {
      return sortConfig.direction === "ascending"
        ? aValue - bValue
        : bValue - aValue;
    } else if (sortConfig.key === "total") {
      // Comparación numérica para total
      return sortConfig.direction === "ascending"
        ? aValue - bValue
        : bValue - aValue;
    } else if (typeof aValue === "string" && typeof bValue === "string") {
      // Ordena otras cadenas normalmente
      return sortConfig.direction === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      // Comparación numérica para cualquier otro número
      return sortConfig.direction === "ascending"
        ? aValue - bValue
        : bValue - aValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      // Comparación de fechas
      return sortConfig.direction === "ascending"
        ? aValue - bValue
        : bValue - aValue;
    } else {
      return 0;
    }
  });

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
