import "./App.css";
import { LoginScreenLayout } from "./components/login/LoginScreenLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components/login/Form";
import { ScreenLayout } from "./components/main/layout/MainScreenLayout";
import { Dashboard } from "./components/main/modules/Dashboard";
import { Inventario } from "./components/main/modules/inventario/Inventario";
import { Tienda } from "./components/main/modules/tienda/Tienda";
import { Customer } from "./components/main/modules/clientes/Customers";
import { NewProduct } from "./components/main/modules/tienda/NewProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreenLayout />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route path="/user" element={<ScreenLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/tienda" element={<Tienda />} />
          <Route path="/user/inventario" element={<Inventario />} />
          <Route path="/user/Clientes" element={<Customer />} />
        </Route>

        <Route path="/postproduct" element={<NewProduct />} />
      </Routes>
      {/* <Window /> */}
    </Router>
  );
}

{
  /* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
}

export default App;
