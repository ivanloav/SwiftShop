import "./NewProduct.css";
import useProductForm from "../../../../hooks/useProductForm";

export const NewProduct = () => {
  const { formData, handleChange, handleSubmit, error, loading } =
    useProductForm();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear nuevo producto</h2>
        <form onSubmit={handleSubmit} id="new-product-form" className="form">
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
          <div className="content-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Add Product"}
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
