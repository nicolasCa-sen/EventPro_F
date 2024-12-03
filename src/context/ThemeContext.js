import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useTheme = () => {
  return useContext(ThemeContext);
};
