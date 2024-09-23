import "./Form.css";
import logo from "/logo.png"
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export function RegisterForm () {
    return (
      <>
        <div className="container">
          <img src={logo} className="logo" />
          <form>
            <input
              className="client"
              placeholder="cliente152165@swiftshop.com"
              disabled
            ></input>
            <input
              placeholder="Create password"
              name="password"
              type="password"
            ></input>
            <input
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
            ></input>
            <button>Register</button>
            <Link to="/login">Ir a Login</Link>
          </form>
        </div>
      </>
    );
}
export function LoginForm() {

  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin
  } = useLogin();

  return (
    <>
      <div className="container">
        <img src={logo} className="logo" />
        <form onSubmit={handleLogin}>
          <input
            className="client"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <Link to="/register">Ir a Registro</Link>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
}