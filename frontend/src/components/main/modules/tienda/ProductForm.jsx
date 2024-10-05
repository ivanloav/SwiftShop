import "./ProductForm.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, updateProduct, getToken } from "../../../../services/api";
import useProductForm from "../../../../hooks/useProductForm";

export const ProductForm = ({ isEditMode }) => {
  const { formData, handleChange, handleSubmit, error, loading, setFormData } =
    useProductForm();
  const { productId } = useParams();
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (isEditMode && productId) {
      const fetchProduct = async () => {
        try {
          const token = getToken();
          const products = await getProducts(token);

          // Filtrar para obtener el producto que coincida con el productId
          const product = products.find(
            (p) => p.productId === parseInt(productId)
          );

          if (product) {
            console.log("Producto obtenido para edición:", product);

            // Establece los valores del producto en el formulario
            setFormData({
              name: product.name || "",
              category: product.category || "",
              description: product.description || "",
              price: product.price || 0,
              stock: product.stock || 0,
              image: product.image || "", // Asegúrate de usar el campo correcto para la imagen
            });

            setLoadingProduct(false);
          } else {
            console.error("Producto no encontrado");
            setLoadingProduct(false);
          }
        } catch (error) {
          console.error("Error al obtener el producto:", error);
          setLoadingProduct(false);
        }
      };

      fetchProduct();
    } else {
      setLoadingProduct(false);
    }
  }, [isEditMode, productId, setFormData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        const token = getToken();
        await updateProduct(productId, formData, token);
        alert("Producto actualizado con éxito.");

        // Notificar a otras ventanas o componentes que se actualizó un producto
        localStorage.setItem("productUpdated", "true");

        window.close();
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    } else {
      handleSubmit(e);

      // Notificar a otras ventanas o componentes que se creó un producto nuevo
      localStorage.setItem("productUpdated", "true");
    }
  };

  if (isEditMode && loadingProduct) {
    return <div>Cargando datos del producto...</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditMode ? "Editar producto" : "Crear nuevo producto"}</h2>
        <form onSubmit={onSubmit} id="new-product-form" className="form">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
            placeholder="Nombre del producto"
          />

          <input
            placeholder="Categoría"
            type="text"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Descripción"
            type="text"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            style={{ height: "200px" }}
            required
          />
          <input
            placeholder="URL de la imagen"
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            required
          />

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

          <div className="input-numbers">
            <div>
              <label>Precio</label>
              <input
                placeholder="Precio"
                type="number"
                name="price"
                value={formData.price || 0}
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
                value={formData.stock || 0}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="content-buttons">
            <button type="submit" disabled={loading}>
              {isEditMode ? "Actualizar producto" : "Crear producto"}
            </button>
            <button className="cancel" type="button" onClick={window.close}>
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
