import { useState, useEffect } from "react";
import { getCustomers, getProducts, createOrder } from "../services/api";

export const useOrderForm = () => {
  const [formData, setFormData] = useState({
    customerId: "", // ID del cliente
    productId: "", // ID del producto
    quantity: 1, // Cantidad por defecto
    total: 0, // El total se calcula automáticamente
  });
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductImage, setSelectedProductImage] = useState(""); // Estado para la imagen del producto seleccionado
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Actualiza el estado del formulario cuando los inputs cambian
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si se selecciona un producto, calcular el total basado en la cantidad y el precio, y actualizar la imagen
    if (name === "productId") {
      const selectedProduct = products.find(
        (p) => p.productId === parseInt(value)
      );
      const total = selectedProduct
        ? selectedProduct.price * formData.quantity
        : 0;
      setFormData({ ...formData, productId: parseInt(value), total });

      // Establecer la imagen del producto seleccionado
      if (selectedProduct && selectedProduct.image) {
        setSelectedProductImage(selectedProduct.image);
      } else {
        setSelectedProductImage(""); // Si no hay imagen, limpiar la imagen seleccionada
      }
    } else if (name === "quantity") {
      // Si se cambia la cantidad, recalcular el total
      const selectedProduct = products.find(
        (p) => p.productId === parseInt(formData.productId)
      );
      const total = selectedProduct ? selectedProduct.price * value : 0;
      setFormData({ ...formData, quantity: parseInt(value), total });
    } else if (name === "customerId") {
      // Asegurarse de que customerId sea un identificador válido
      setFormData({ ...formData, customerId: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Envía el formulario para crear un nuevo pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createOrder(formData);
      localStorage.setItem("refreshOrders", Date.now());
      //window.close();
    } catch (error) {
      setError("Error al crear el pedido.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    customers,
    products,
    selectedProductImage, // Devuelve la URL de la imagen seleccionada
    handleChange,
    handleSubmit,
    error,
    loading,
  };
};
