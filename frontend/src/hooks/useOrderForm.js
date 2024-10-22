import { useState, useEffect } from "react";
import {
  getCustomers,
  getProducts,
  createOrder,
  updateOrder,
  getOrderById,
} from "../services/api";

export const useOrderForm = (orderId, isEditMode) => {
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    total: 0,
    status: "",
    //items: [],
  });
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false); // Añadir estado de carga de pedido

  useEffect(() => {
    // Cargar los clientes y productos al montar el componente
    const fetchCustomersAndProducts = async () => {
      try {
        const [customersData, productsData] = await Promise.all([
          getCustomers(),
          getProducts(),
        ]);
        setCustomers(customersData);
        setProducts(productsData);
      } catch (error) {
        setError("Error al cargar datos.");
      }
    };

    fetchCustomersAndProducts();
  }, []);

  useEffect(() => {
    if (isEditMode && orderId) {
      const fetchOrder = async () => {
        setLoadingOrder(true); // Establecer estado de carga de pedido
        try {
          const order = await getOrderById(orderId);
          if (order) {
            setFormData({
              customerId: order.customer.customerId || "",
              productId: order.product.productId || "",
              quantity: order.quantity || 1,
              total: parseFloat(order.total) || 0, // Asegurarse de que total sea un número decimal
              status: order.status || "",
            });
            if (order.product.productId) {
              const selectedProduct = products.find(
                (p) => p.productId === order.product.productId
              );
              if (selectedProduct && selectedProduct.image) {
                setSelectedProductImage(selectedProduct.image);
              }
            }
          }
        } catch (error) {
          setError("Error al cargar el pedido.");
        } finally {
          setLoadingOrder(false); // Finalizar estado de carga de pedido
        }
      };

      fetchOrder();
    }
  }, [isEditMode, orderId, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productId") {
      const selectedProduct = products.find(
        (p) => p.productId === parseInt(value)
      );
      const total = selectedProduct
        ? selectedProduct.price * formData.quantity
        : 0;
      setFormData({
        ...formData,
        productId: parseInt(value),
        total: parseFloat(total),
      });

      if (selectedProduct && selectedProduct.image) {
        setSelectedProductImage(selectedProduct.image);
      } else {
        setSelectedProductImage("");
      }
    } else if (name === "quantity") {
      const selectedProduct = products.find(
        (p) => p.productId === parseInt(formData.productId)
      );
      const total = selectedProduct ? selectedProduct.price * value : 0;
      setFormData({
        ...formData,
        quantity: parseInt(value),
        total: parseFloat(total),
      });
    } else if (name === "customerId") {
      setFormData({ ...formData, customerId: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateOrder(orderId, formData);
        localStorage.setItem("orderUpdated", "true");
      } else {
        formData.status = "received";
        await createOrder(formData);
        localStorage.setItem("orderCreated", "true");
      }
      alert("Pedido guardado con éxito.");
      window.close();
    } catch (error) {
      setError("Error al guardar el pedido.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    customers,
    products,
    selectedProductImage,
    handleChange,
    handleSubmit,
    error,
    loading,
    loadingOrder, // Añadir estado de carga de pedido al retorno
  };
};
