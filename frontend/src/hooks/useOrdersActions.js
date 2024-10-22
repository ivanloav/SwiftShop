import { useState } from "react";
import { createOrder, deleteOrder, updateOrder } from "../services/api";

export function useOrdersActions() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      await createOrder(orderData);
      alert("Order created successfully!");
      window.location.reload(); // Optionally reload the page to reflect changes
    } catch (error) {
      setError("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteOrder(orderId);
      alert("Order deleted successfully!");
      window.location.reload(); // Optionally reload the page to reflect changes
    } catch (error) {
      setError("Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (orderId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      await updateOrder(orderId, updatedData);
      alert("Order updated successfully!");
      window.location.reload(); // Optionally reload the page to reflect changes
    } catch (error) {
      setError("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreate,
    handleDelete,
    handleEdit,
    error,
    loading,
  };
}
