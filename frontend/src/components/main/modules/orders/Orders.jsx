import "./Orders.css";
import React, { useEffect, useState } from "react";
import { getOrders } from "../../../../services/api"; // Importa tu función de obtener órdenes desde api.js
import { useOrdersLogic } from "../../../../hooks/useOrdersLogic";
import { useRefreshOnLocalStorage } from "../../../../hooks/useRefreshOnLocalStorage";

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
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    : [];

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  return (
    <div className="full-screen">
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
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
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
