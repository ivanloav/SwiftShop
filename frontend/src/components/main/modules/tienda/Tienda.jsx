import "./Tienda.css";
import { useEffect } from "react";
import { useProductsLogic } from "../../../../hooks/useProductsLogic";
import { OpenInNewWindow } from "../../../../hooks/openWindow";
import { useRefreshOnLocalStorage } from "../../../../hooks/useRefreshOnLocalStorage";
import { useProductActions } from "../../../../hooks/useProductAcions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export const Tienda = () => {
  const { data, loading, fetchData } = useProductsLogic();
  const { handleDelete } = useProductActions();

  const handleOpenProductForm = () => {
    OpenInNewWindow("/postproduct");
  };

  // Escucha los cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("productUpdated") === "true") {
        fetchData(); // Refrescar la lista de productos
        localStorage.removeItem("productUpdated"); // Limpiar la señal
      }
    };

    // Añadir el listener de cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    // Limpiar el listener cuando se desmonte el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchData]);

  // Use the custom hook to listen for localStorage changes
  useRefreshOnLocalStorage("refreshTienda", fetchData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="full-screen">
      <div className="col">
        <div className="botones">
          <button className="btn" onClick={handleOpenProductForm}>
            Crear Producto
          </button>
        </div>
        <div className="inventario">
          <table id="inventario">
            <thead>
              <tr height="50px">
                <th width="20%">Producto</th>
                <th width="10%">Precio</th>
                <th width="20%">Categoría</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((product) => (
                  <tr key={product.productId}>
                    <td>
                      {product.productId} {product.name}
                    </td>
                    <td>{product.price + " €"}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className="btn btn-icon"
                        onClick={() =>
                          OpenInNewWindow(`/editproduct/${product.productId}`)
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-icon cancel"
                        onClick={() => handleDelete(product.productId)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay productos en la tienda</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
