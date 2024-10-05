import "./OrderForm.css";
import { useOrderForm } from "../../../../hooks/useOrderForm";

export const OrderForm = () => {
  const {
    formData,
    products,
    customers,
    handleChange,
    handleSubmit,
    error,
    loading,
  } = useOrderForm();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear Nuevo Pedido</h2>
        <form onSubmit={handleSubmit} id="new-order-form" className="form">
          {/* Selección de cliente */}
          <select
            className="select"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
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
            value={formData.productId}
            onChange={handleChange}
            required
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
            {formData.image && (
              <img
                src={formData.image}
                alt="Imagen del producto"
                style={{ width: "200px", height: "200px", margin: "10px 0" }}
              />
            )}
          </div>
          {/* Cantidad */}
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            placeholder="Cantidad"
          />

          {/* Total calculado */}
          <input
            type="text"
            name="total"
            value={formData.total.toFixed(2)} // Mostrar total con dos decimales
            readOnly
            placeholder="Total"
          />

          {/* Botones del formulario */}
          {/* Los botones están dentro del formulario */}
          <div className="content-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Pedido"}
            </button>
            <button className="cancel" type="button" onClick={window.close}>
              Cancelar
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
