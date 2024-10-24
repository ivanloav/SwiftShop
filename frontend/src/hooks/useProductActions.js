// Este archivo contiene el hook personalizado que se encarga de manejar las acciones de edición y eliminación de productos.
import { useState } from "react";
import { deleteProduct, updateProduct } from "../services/api"; // Asegúrate de que estas funciones están implementadas en tu servicio API

export function useProductActions() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(productId);
      alert("¡Producto eliminado exitosamente!");
      window.location.reload(); // Optionally reload the page to reflect changes
    } catch (error) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (productId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      await updateProduct(productId, updatedData);
      alert("¡Producto actualizado exitosamente!");
      window.location.reload(); // Optionally reload the page to reflect changes
    } catch (error) {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDelete,
    handleEdit,
    error,
    loading,
  };
}
