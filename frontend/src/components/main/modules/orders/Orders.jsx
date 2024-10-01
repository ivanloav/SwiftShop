import React, { useEffect, useState } from "react";
import { getOrders } from "../../../../services/api"; // Importa tu función de obtener órdenes desde api.js
import { useOrdersLogic } from "../../../../hooks/useOrdersLogic";
import { useRefreshOnLocalStorage } from "../../../../hooks/useRefreshOnLocalStorage";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  //const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  return (
    <div className="full-screen">
      <div className="col col-2">
        <div className="inventario">
          <table id="inventario">
            <thead>
              <tr height="50px">
                <th width="10%">ID</th>
                <th width="50%">Producto</th>
                <th width="20%">Stock</th>
                <th width="20%">Tienda</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((orders) => (
                  <tr key={orders.orderId}>
                    <td>{orders.productId}</td>
                    <td>{orders.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay pedidos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};
