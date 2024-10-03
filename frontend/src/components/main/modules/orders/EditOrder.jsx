import "./EditOrder.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../config";
import { getProducts, updateProduct, getToken } from "../../../../services/api"; // Importa las funciones de api.js

export const EditOrder = () => {
  const { productId } = useParams();
  console.log("productId: " + productId);
  console.log("useParams: " + useParams());
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product");
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFormData({
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            stock: data.stock,
          });
        } else {
          setError("No se pudo cargar el producto.");
        }
      } catch (error) {
        setError("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProduct(productId, formData); // Usa la función updateProduct de api.js
      alert("Producto actualizado correctamente.");
      localStorage.setItem("productUpdated", "true"); // Guarda en localStorage que se ha actualizado un producto
      window.close();
    } catch (error) {
      setError("Error al actualizar el producto.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={window.onClose}>
          &times;
        </span>
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit} id="edit-product-form" className="form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre del producto"
          />
          <input
            placeholder="Categoría"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Descripción"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ height: "200px" }}
            required
          />
          <div className="input-numbers">
            <div>
              <label>Precio</label>
              <input
                placeholder="Precio"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                placeholder="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar Producto"}
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
