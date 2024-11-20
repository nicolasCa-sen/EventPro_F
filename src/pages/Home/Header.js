import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import sinuserImage from '../Images/sinuser.png';
import logo from '../Images/logo.png';
import { useAuth } from '../../context/AuthContext';  // Importa el contexto de autenticación

const Header = ({ scrollToCarrusel, scrollToEventos, scrollToInicio }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { user, logout } = useAuth();  // Obtén el usuario y la función logout desde el contexto
    const navigate = useNavigate();
    const location = useLocation();  // Obtener la ubicación actual de la ruta

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
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

    const handleEventosClick = () => {
        navigate('/');
        setTimeout(scrollToEventos, 500); // Espera y luego desplázate a Todos
    };

    const handleLogout = () => {
        logout();  // Llama al logout del contexto
        navigate('/'); // Redirige al inicio después de cerrar sesión
    };

    // Lógica para redirigir según el rol del usuario
    const handleProfileClick = () => {
        if (user.role === 'Administrador') {
            navigate('/admin');
        } else if (user.role === 'Organizador') {
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
                {/* Mostrar el botón de INICIO solo si no estamos en la página de inicio */}
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
                        <button 
                            className={`login-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
                            onClick={handleLoginClick}
                        >
                            Iniciar Sesión
                        </button>
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