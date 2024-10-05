import "./App.css";
import PrivateRoute from "./components/PrivateRoute"; // Importa el componente PrivateRoute
import { LoginScreenLayout } from "./components/login/LoginScreenLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components/login/Form";
import { ScreenLayout } from "./components/main/layout/MainScreenLayout";
import { Dashboard } from "./components/main/modules/Dashboard";
import { Inventario } from "./components/main/modules/inventario/Inventario";
import { Tienda } from "./components/main/modules/tienda/Tienda";
import { Orders } from "./components/main/modules/orders/Orders";
import { OrderForm } from "./components/main/modules/orders/OrderForm";
import { ProductForm } from "./components/main/modules/tienda/ProductForm";
import { useEffect } from "react";
import checkTokenExpiration from "./services/checkTokenExpiration"; // Importación por defecto

function App() {
  // Llama a checkTokenExpiration cuando el componente App se monte
  useEffect(() => {
    checkTokenExpiration(); // Verifica la expiración del token
  }, []); // El array vacío significa que esto solo se ejecuta al montar el componente

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
          <Route
            path="/newproduct"
            element={<ProductForm isEditMode={false} />}
          />
          <Route
            path="/editproduct/:productId"
            element={<ProductForm isEditMode={true} />}
          />

          {/* Ruta protegida para crear nuevos productos */}
          <Route path="/neworder" element={<OrderForm isEditMode={false} />} />
          <Route
            path="/editorder/:orderId"
            element={<OrderForm isEditMode={true} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
