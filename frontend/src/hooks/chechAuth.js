// auth.js
export const handleLogout = () => {
  // Eliminar el token de localStorage o sessionStorage
  localStorage.removeItem("accessToken");

  // Si es necesario, también puedes hacer una petición al servidor para invalidar la sesión.
  // Por ejemplo:
  // fetch("/api/auth/logout", { method: "POST" });

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "/login";
};
