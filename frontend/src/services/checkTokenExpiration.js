import * as jwtDecode from "jwt-decode"; // Importar todo el módulo

const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token); // Usar jwtDecode normalmente
    const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos
    if (decodedToken.exp < currentTime) {
      // El token ha expirado
      localStorage.removeItem("token"); // Limpia el token
      window.location.href = "/login"; // Redirige al login
    }
  }
};

export default checkTokenExpiration;
