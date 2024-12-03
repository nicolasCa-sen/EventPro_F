import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import sinuserImage from '../Images/sinuser.png';
import logo from '../Images/logo.png';
import { useAuth } from '../../context/AuthContext'; // Contexto de autenticación
import { useTheme } from '../../context/ThemeContext'; // Contexto de tema global

const Header = ({ scrollToCarrusel, scrollToEventos, scrollToInicio }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Usar el contexto de tema
  const { user, logout } = useAuth(); // Usar el contexto de autenticación
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleInicioClick = () => {
    navigate('/');
    setTimeout(scrollToInicio, 100); // Espera y luego desplázate a Inicio
  };

  const handleCarruselClick = () => {
    navigate('/');
    setTimeout(scrollToCarrusel, 100); // Espera y luego desplázate a Próximos Eventos
  };

  const handleRegisterClick = () => {
    navigate('/registro'); // Navegar a la página de registro
  };

  const handleEventosClick = () => {
    navigate('/');
    setTimeout(scrollToEventos, 500); // Espera y luego desplázate a Todos
  };

  const handleLogout = () => {
    logout(); // Cierra la sesión
    navigate('/'); // Redirige al inicio después de cerrar sesión
  };

  const handleProfileClick = () => {
    if (user?.rol === 'Administrador') {
      navigate('/admin');
    } else if (user?.rol === 'Organizador') {
      navigate('/org');
    } else {
      navigate('/profile');
    }
  };

  return (
    <header className={`header-head-menu ${isDarkMode ? 'dark-head-menu' : 'light-head-menu'}`}>
      <div className="header-left-head-menu">
        <img src={logo} alt="Logo" className="logo-head-menu" />
        <span className="web-name-head-menu">EvenT Proo</span>
      </div>
      <nav className={`header-buttons-head-menu ${isMenuOpen ? 'open-head-menu' : ''} ${isDarkMode ? 'dark-nav-head-menu' : 'light-nav-head-menu'}`}>
        {location.pathname !== '/' && (
          <button 
            className={`header-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
            onClick={handleInicioClick}
          >
            INICIO
          </button>
        )}
        <div className="user-section-head-menu">
          {user ? (
            <>
              <span className="user-email-head-menu">{user.email}</span>
              <button 
                className={`header-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
                onClick={handleProfileClick}
              >
                Perfil
              </button>
              <button 
                className={`header-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button 
                className={`register-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
              <button 
                className={`login-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
                onClick={handleLoginClick}
              >
                Iniciar Sesión
              </button>
            </>
          )}
          <img src={sinuserImage} alt="Usuario" className="user-icon-head-menu" />
        </div>
      </nav>
      <button className="hamburger-head-menu" onClick={toggleMenu}>
        &#9776;
      </button>
      <button 
        className={`theme-toggle-head-menu ${isDarkMode ? 'dark-theme-toggle-head-menu' : 'light-theme-toggle-head-menu'}`} 
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <span role="img" aria-label="Luna">🌤️</span>
        ) : (
          <span role="img" aria-label="Sol">🌕</span>
        )}
        <span className={`toggle-indicator ${isDarkMode ? 'on' : 'off'}`}></span>
      </button>
    </header>
  );
};

export default Header;
