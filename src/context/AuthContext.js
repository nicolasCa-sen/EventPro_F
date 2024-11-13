import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Función para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente que proporciona el contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Datos de prueba de usuarios
  const users = [
    { email: 'usuario@example.com', role: 'Usuario', password: 'password123' },
    { email: 'admin@example.com', role: 'Administrador', password: 'admin123' },
    { email: 'organizador@example.com', role: 'Organizador', password: 'org123' },
  ];

  // Cargar el usuario desde localStorage si está disponible
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función de login
  const login = ({ email, password, role }) => {
    const foundUser = users.find(user => user.email === email && user.password === password && user.role === role);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser)); // Guardar usuario en localStorage
      return true; // Login exitoso
    } else {
      return false; // Login fallido
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Eliminar usuario de localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
