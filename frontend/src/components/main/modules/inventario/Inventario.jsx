import "./Inventario.css";
import { useInventoryLogic } from "../../../../hooks/useInventoryLogic";

export const Inventario = () => {
  const { data, loading } = useInventoryLogic();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="full-screen">
      <div className="col col-2">
        <div className="inventario">
          <table id="inventario">
            <thead>
              <tr height="50px">
                <th width="10%">ID</th>
                <th width="50%">Producto</th>
                <th>Stock</th>
                <th>Tienda</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product}</td>
                  <td>{product.quantity}</td>
                  <td>{product.store}</td>
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
