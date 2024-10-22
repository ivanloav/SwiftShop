import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginForm } from "./components/login/Form";
import { RegisterForm } from "./components/login/Form";
import Dashboard from "./components/dashboard/Dashboard"; // Componente de Dashboard
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <PrivateRoute path="/user/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
