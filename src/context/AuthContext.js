import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para verificar si los datos están cargando
  const [error, setError] = useState(null); // Estado para almacenar posibles errores

  // Verificar si hay un token al cargar el componente y mantener la sesión activa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (userInfo) {
        setUser(userInfo);  // Establecemos el estado del usuario con la información que hemos guardado
      }
    }
    setLoading(false);  // Termina de cargar una vez que hemos comprobado el token
  }, []);

  const login = async (userInfo) => {
    try {
      const response = await fetch('https://eventpro-b.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
  
      const data = await response.json();
      if (response.ok && data.state) {
        // Asegúrate de que el rol esté presente en los datos del usuario
        console.log('Datos del usuario:', data.user);  // Verifica aquí si el rol está presente
  
        setUser(data.user);  // Guardamos el usuario completo (incluido el rol)
        localStorage.setItem('token', data.token);  // Guardamos el token
        localStorage.setItem('user', JSON.stringify(data.user));  // Guardamos los datos del usuario
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) {
          console.log('Rol recuperado del localStorage:', userInfo.rol);  // Verifica que el rol esté allí
          setUser(userInfo);
        }
        return true;
      } else {
        setError('Credenciales incorrectas o error en el servidor');
        return false;
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Ocurrió un error al intentar iniciar sesión');
      return false;
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Al devolver el contexto, incluimos el estado de carga y el error
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
