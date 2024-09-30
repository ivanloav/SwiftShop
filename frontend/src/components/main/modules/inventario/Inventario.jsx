import "./Inventario.css";
import { useInventoryLogic } from "../../../../hooks/useInventoryLogic";

export const Inventario = () => {
  const { data, loading } = useInventoryLogic();
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div className="full-screen">
      <div className="col col-2">
        <div className="inventario">
          <table id="inventario">
            <thead>
              <tr height="50px">
                <th width="10%">ID</th>
                <th width="50%">Producto</th>
                <th width="20%">Stock</th>
                <th width="20%">Tienda</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.store ? product.store.storeId : "Sin tienda"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};
