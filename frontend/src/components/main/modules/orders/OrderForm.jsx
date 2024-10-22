import "./OrderForm.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOrderForm } from "../../../../hooks/useOrderForm";
import { BaseImgURL } from "../../../../config";
import { getOrders, updateOrder, getToken } from "../../../../services/api";

export const OrderForm = ({ isEditMode, isViewMode }) => {
  const { orderId } = useParams();
  const {
    formData,
    products,
    customers,
    selectedProductImage, // Obtén la URL de la imagen seleccionada
    handleChange,
    handleSubmit,
    error,
    loading,
    setFormData,
  } = useOrderForm(orderId, isEditMode);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [productImage, setProductImage] = useState(""); // Estado para la imagen del producto

  useEffect(() => {
    if ((isEditMode || isViewMode) && orderId) {
      const fetchOrder = async () => {
        try {
          const token = getToken();
          const orders = await getOrders(token);

          // Filtrar para obtener el pedido que coincida con el orderId
          const order = orders.find((o) => o.orderId === parseInt(orderId));

          if (order) {
            console.log("Pedido obtenido para edición:", order);

            // Establece los valores del pedido en el formulario
            setFormData({
              orderId: order.orderId || "",
              customerId: order.customer.customerId || "",
              productId: order.product.productId || "",
              quantity: order.quantity || 1,
              total: Number(order.total) || 0, // Asegurarse de que total sea un número
              status: order.status || "",
              //items: order.items || [],
            });

            // Establecer la imagen del producto
            setProductImage(order.product.image || "");

            setLoadingOrder(false);
          } else {
            console.error("Pedido no encontrado");
            setLoadingOrder(false);
          }
        } catch (error) {
          console.error("Error al obtener el pedido:", error);
          setLoadingOrder(false);
        }
      };
      fetchOrder();
    } else {
      setLoadingOrder(false);
    }
  }, [isEditMode, isViewMode, orderId, setFormData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        const token = getToken();
        const { items, ...orderData } = formData; // Eliminar el campo items
        orderData.customerId = formData.customerId;
        orderData.productId = formData.productId;
        orderData.total = parseFloat(formData.total).toFixed(2); // Convertir a cadena con dos decimales
        console.log("TOTAL: " + orderData.total);
        console.log("Datos enviados al servidor:", orderData); // Agregar console.log para verificar los datos
        await updateOrder(orderId, orderData, token);
        localStorage.setItem("orderUpdated", "true");
        alert("Pedido actualizado con éxito.");
        window.close();
      } catch (error) {
        console.error("Error al actualizar el pedido:", error);
      }
    } else {
      handleSubmit(e);

      // Notificar a otras ventanas o componentes que se creó un nuevo pedido
      localStorage.setItem("orderCreated", "true");
      alert("Pedido creado con éxito.");
      window.close();
    }
  };

  if ((isEditMode || isViewMode) && loadingOrder) {
    return <div>Cargando datos del pedido...</div>;
  }

  const handleImageError = (e) => {
    e.target.src = BaseImgURL + "no-image-icon.png"; // Imagen genérica si falla la carga
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {isEditMode
            ? "Editar pedido"
            : isViewMode
            ? "Detalles del pedido"
            : "Crear nuevo pedido"}
        </h2>
        <form onSubmit={onSubmit} id="new-order-form" className="form">
          {/* Selección de cliente */}
          <select
            className="select"
            name="customerId"
            value={formData.customerId || ""}
            onChange={handleChange}
            required
            disabled={isViewMode}
          >
            <option value="">Seleccionar Cliente</option>
            {customers && customers.length > 0 ? (
              customers.map((customer, index) => (
                <option
                  key={`${customer.customerId}-${index}`}
                  value={customer.customerId}
                >
                  {customer.customerId} - {customer.name}
                </option>
              ))
            ) : (
              <option value="">No hay clientes disponibles</option>
            )}
          </select>
          {/* Selección de producto */}
          <select
            className="select"
            name="productId"
            value={formData.productId || ""}
            onChange={handleChange}
            required
            disabled={isViewMode}
          >
            <option value="">Seleccionar Producto</option>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <option
                  key={`${product.productId}-${index}`}
                  value={product.productId}
                >
                  {product.name} - {product.price} €
                </option>
              ))
            ) : (
              <option value="">No hay productos disponibles</option>
            )}
          </select>
          {/* Mostrar la imagen de S3 si existe */}
          <div className="image-preview">
            {productImage ? (
              <img
                src={`${BaseImgURL}${productImage}.png`}
                alt="Imagen del producto"
                style={{ height: "200px", margin: "10px 0" }}
                onError={handleImageError} // Si falla, cambiará a una imagen genérica
              />
            ) : (
              <img
                src={`${BaseImgURL}no-image-icon.png`} // Imagen genérica
                alt="Imagen no disponible"
                style={{ height: "200px", margin: "10px 0" }}
              />
            )}
          </div>
          {/* Cantidad */}
          <input
            type="number"
            name="quantity"
            value={formData.quantity || 1}
            onChange={handleChange}
            min="1"
            required
            placeholder="Cantidad"
            disabled={isViewMode}
          />
          {/* Total calculado */}
          <input
            type="text"
            name="total"
            value={`${parseFloat(formData.total).toFixed(2)} €`} // Mostrar total con dos decimales
            readOnly
            placeholder="Total"
            className="currency-input"
            disabled={isViewMode}
          />

          {/* Botones del formulario */}
          {/* Los botones están dentro del formulario */}
          <div className="content-buttons">
            {!isViewMode && (
              <button type="submit" disabled={loading}>
                {isEditMode ? "Actualizar pedido" : "Crear pedido"}
              </button>
            )}
            <button
              className="cancel"
              type="button"
              onClick={() => window.close()}
            >
              {isViewMode ? "Cerrar" : "Cancelar"}
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
