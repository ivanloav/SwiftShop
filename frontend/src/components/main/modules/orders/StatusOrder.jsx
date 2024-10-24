import React from "react";
import "./StatusOrder.css";

export const StatusOrder = ({ status }) => {
  // Traducir los estados
  const translateStatus = {
    received: "Recibido",
    processing: "En proceso",
    shipped: "Enviado",
    delivered: "Entregado",
  };

  // Establecer el color basado en el estado
  const getStatusStyle = (status) => {
    switch (status) {
      case "received":
        return "badge-received"; // Color naranja
      case "processing":
        return "badge-processing"; // Color amarillo
      case "shipped":
        return "badge-shipped"; // Color amarillo claro
      case "delivered":
        return "badge-delivered"; // Color verde
      default:
        return "";
    }
  };

  return (
    <span className={`status-order ${getStatusStyle(status)}`}>
      {translateStatus[status] || status}
    </span>
  );
};
