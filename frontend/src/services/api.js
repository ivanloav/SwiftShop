import axios from 'axios';
                        

const API_BASE_URL = 'http://localhost:3000';

export const getInventory = async () => {
    try {
        console.log("fetching inventory from api.js...")
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        return response.data;
        
    } catch (error) {
        console.log('Error fetching data in getInventory in app.js', error);
        throw error;
    }
}

export const getProducts = async () => {
    try {
        console.log("getting products from api")
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.log("Error fetching data in getProducts api.js", error);
        throw error;
    }
}
export const createProduct = async product => {
    try {
        console.log("creating new product posting to api.js")
        const response = await axios.post(`${API_BASE_URL}/products`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch (error) {
        console.log('Error creating product', error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${productId}`);
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    await axios.put(`${API_BASE_URL}/products/${productId}`, updatedData);
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};