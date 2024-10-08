import axios from "axios";
import { API_BASE_URL } from "../config";

//const API_BASE_URL = "http://ec2-54-235-225-199.compute-1.amazonaws.com/api";
//const API_BASE_URL = "http://localhost:3000/api";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

export const getDashboardData = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No hay token, por favor inicia sesión.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`, // Añadir el token en el encabezado
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del dashboard", error);
    throw error;
  }
};

export const getInventory = async () => {
  try {
    console.log("fetching inventory from api.js...");
    const response = await axios.get(`${API_BASE_URL}/inventory`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching data in getInventory in app.js", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    console.log("getting products from api");
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching data in getProducts api.js", error);
    throw error;
  }
};
export const createProduct = async (product) => {
  try {
    console.log("creating new product posting to api.js");
    const response = await axios.post(`${API_BASE_URL}/products`, product, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Send token with request
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating product", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    await axios.put(`${API_BASE_URL}/products/${productId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};
