import { useState } from "react";
import { createProduct } from "../services/api";

const useProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
          await createProduct(formData);
          // Notify other windows to refresh
          localStorage.setItem("refreshTienda", Date.now());
          // Optionally close the current window
          window.close();
        } catch (error) {
            setError('Failed to create product')
        } finally { 
            setLoading(false)
        }
    };

    return {
        formData,
        handleSubmit,
        handleChange,
        error,
        loading
    }
}
export default useProductForm;