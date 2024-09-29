import { useState } from "react";
import { API_BASE_URL } from "../../config";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

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
      console.log("DATA: " + data);

      if (data.success) {
        // Guardar el token JWT en localStorage o sessionStorage
        localStorage.setItem("token", data.token); // Guarda el token para usarlo después
        alert("Login exitoso");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error en la solicitud de inicio de sesión");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
