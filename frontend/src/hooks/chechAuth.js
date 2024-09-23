// auth.js
export const checkAuth = async (username, password) => {
  // Simulación de una llamada a la API de autenticación
  if (username === "admin" && password === "password") {
    return { success: true, user: { username: "admin" } };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};
