import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/api"; // Asegúrate de tener el método updateProduct

const useProductForm = (initialData = null, productId = null) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si recibimos datos iniciales (en el caso de edición), los establecemos
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (productId) {
        // Si existe productId, estamos en modo edición
        await updateProduct(productId, formData);
        alert("Producto actualizado con éxito");
      } else {
        // Modo creación
        await createProduct(formData);
        // Notificar a otras ventanas que se ha creado un nuevo producto
        localStorage.setItem("refreshTienda", Date.now());
        window.close();
      }
    } catch (error) {
      setError("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleSubmit,
    handleChange,
    error,
    loading,
    setFormData, // Esto permitirá que el componente pueda establecer los datos del producto en el modo edición
  };
};

export default useProductForm;
