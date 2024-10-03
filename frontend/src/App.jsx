import "./App.css";
import PrivateRoute from "./components/PrivateRoute"; // Importa el componente PrivateRoute
import { LoginScreenLayout } from "./components/login/LoginScreenLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components/login/Form";
import { ScreenLayout } from "./components/main/layout/MainScreenLayout";
import { Dashboard } from "./components/main/modules/Dashboard";
import { Inventario } from "./components/main/modules/inventario/Inventario";
import { Tienda } from "./components/main/modules/tienda/Tienda";
import { NewProduct } from "./components/main/modules/tienda/NewProduct";
import { EditProduct } from "./components/main/modules/tienda/EditProduct";
import { Orders } from "./components/main/modules/orders/Orders";
import { NewOrder } from "./components/main/modules/orders/NewOrder";
import { EditOrder } from "./components/main/modules/orders/EditOrder";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginScreenLayout />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<ScreenLayout />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/inventario" element={<Inventario />} />
            <Route path="/user/tienda" element={<Tienda />} />
            <Route path="/user/orders" element={<Orders />} />
          </Route>

          {/* Ruta protegida para crear nuevos productos */}
          <Route path="/postproduct" element={<NewProduct />} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />

          {/* Ruta protegida para crear nuevos productos */}
          <Route path="/neworder" element={<NewOrder />} />
          <Route path="/editorder/:orderId" element={<EditOrder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
