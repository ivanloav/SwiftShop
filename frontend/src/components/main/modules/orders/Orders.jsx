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
  faEllipsisV,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { OpenInNewWindow } from "../../../../hooks/openWindow";
import { useOrdersActions } from "../../../../hooks/useOrdersActions";
import DropdownActions from "./DropdownActions";
import { updateOrderStatus } from "../../../../services/api";

export const Orders = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "orderId",
    direction: "descending",
  });
  const { data, loading, fetchData } = useOrdersLogic();
  const { handleDelete } = useOrdersActions();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOpenOrderForm = () => {
    OpenInNewWindow("/neworder", 900, 900);
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

  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
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
        } else {
          return 0;
        }
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

  const getProgressPercentage = (count, total) => {
    return total === 0 ? "0%" : `${((count / total) * 100).toFixed(2)}%`;
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
  const totalShipped = sortedData.filter(
    (order) => order.status === "shipped"
  ).length;

  const handleUpdateOrderStatus = async (orderId, newState) => {
    try {
      await updateOrderStatus(orderId, newState);
      fetchData(); // Refrescar los datos después de la actualización
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  };

  // Calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
          <div className="stat-title2">
            Pedidos totales: {totalOrders} <br /> <br />
            Artículos pedidos: {totalItemsOrdered}
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
          <div className="stat-value">{totalShipped}</div>
          <div className="stat-bar">
            <div
              className="progress"
              style={{
                width: getProgressPercentage(totalShipped, totalOrders),
              }}
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
                  onClick={() => requestSort("created_at")}
                  className={sortConfig.key === "created_at" ? "sorted" : ""}
                >
                  Fecha {getSortArrow("created_at")}
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
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((order) => (
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
                    <td className="action-buttons">
                      <DropdownActions
                        icon={faEllipsisV}
                        onDetails={() =>
                          OpenInNewWindow(
                            `/vieworder/${order.orderId}`,
                            900,
                            900
                          )
                        }
                        onStateChange={(newState) => {
                          const translatedState =
                            stateTranslations[newState] || newState;
                          if (
                            window.confirm(
                              `¿Realmente quieres cambiar el estado a ${translatedState}?`
                            )
                          ) {
                            handleUpdateOrderStatus(order.orderId, newState);
                          }
                        }}
                        currentStatus={order.status}
                        statuses={["En proceso", "Enviado", "Entregado"]}
                      />
                      <button
                        className="btn btn-icon"
                        onClick={() =>
                          OpenInNewWindow(
                            `/editorder/${order.orderId}`,
                            900,
                            900
                          )
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
          {/* Controles de paginación */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
