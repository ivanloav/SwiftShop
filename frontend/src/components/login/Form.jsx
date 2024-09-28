import "./Form.css";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { API_BASE_URL } from "../../config";

export function RegisterForm() {
  const [error, setError] = useState("");

  // Maneja la solicitud de registro
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
          name: "defaultName", // Si el campo `name` no está en el formulario
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Usuario registrado exitosamente");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error en la solicitud de registro");
    }
  }

  return (
    <>
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
    </>
  );
}

export function LoginForm() {
  const [error, setError] = useState("");

  // Maneja la solicitud de inicio de sesión
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
        // Almacena el token en localStorage
        localStorage.setItem("accessToken", data.accessToken);
        // Redirige al dashboard
        window.location.href = "/user/dashboard";
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error en la solicitud de inicio de sesión");
    }
  }

  return (
    <>
      <div className="container">
        <img src={logo} className="logo" alt="Logo" />
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
    </>
  );
}
