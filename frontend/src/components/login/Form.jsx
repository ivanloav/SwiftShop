import "./Form.css";
import logo from "/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { API_BASE_URL } from "../../config";

export function RegisterForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de navegación

  async function handleRegister(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: "defaultName",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirigir al login con el mensaje de éxito
        navigate("/login", {
          state: {
            successMessage:
              "Usuario registrado. Por favor, loguéate para continuar",
          },
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error en la solicitud de registro");
    }
  }

  return (
    <div className="container">
      <img src={logo} className="logo" alt="Logo" />
      <form onSubmit={handleRegister}>
        <input
          name="email"
          className="client"
          placeholder="Correo electrónico"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Crear contraseña"
          type="password"
          required
        />
        <input
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          type="password"
          required
        />
        <button type="submit">Registrarse</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/login">Ir a Login</Link>
      </form>
    </div>
  );
}

export function LoginForm() {
  const [error, setError] = useState("");
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const navigate = useNavigate(); // Hook de navegación

  async function handleLogin(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/user/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error en la solicitud de inicio de sesión");
    }
  }

  return (
    <div className="container">
      <img src={logo} className="logo" alt="Logo" />
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          name="email"
          className="client"
          placeholder="Correo electrónico"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          required
        />
        <button type="submit">Iniciar Sesión</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/register">Ir a Registro</Link>
      </form>
    </div>
  );
}
