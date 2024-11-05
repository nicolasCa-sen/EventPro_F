import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Header.css'; // Asegúrate de tener estilos en este archivo
import sinuserImage from '../Images/sinuser.png';
import logo from '../Images/logo.png'; // Ruta al logo

const Header = ({ scrollToCarrusel, scrollToEventos, scrollToInicio }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true); // Estado para manejar el tema
    const navigate = useNavigate(); // Crea una instancia de navigate

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Función para alternar entre tema claro y oscuro
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Función para manejar el clic en "Iniciar Sesión"
    const handleLoginClick = () => {
        navigate('/login'); // Redirige a /login
    };

    return (
        <header className={`header-head-menu ${isDarkMode ? 'dark-head-menu' : 'light-head-menu'}`}>
            <div className="header-left-head-menu">
                <img src={logo} alt="Logo" className="logo-head-menu" />
                <span className="web-name-head-menu">EvenT Proo</span>
            </div>
            <nav className={`header-buttons-head-menu ${isMenuOpen ? 'open-head-menu' : ''} ${isDarkMode ? 'dark-nav-head-menu' : 'light-nav-head-menu'}`}>
                <button className={`header-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} onClick={scrollToInicio}>INICIO</button>
                <button className={`header-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} onClick={scrollToCarrusel}>PRÓXIMOS EVENTOS</button>
                <button className={`header-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} onClick={scrollToEventos}>TODOS</button>
                <div className="user-section-head-menu">
                    <button 
                        className={`login-button-head-menu ${isDarkMode ? 'dark-button-head-menu' : 'light-button-head-menu'}`} 
                        onClick={handleLoginClick} 
                    >
                        Iniciar Sesión
                    </button>
                    <img src={sinuserImage} alt="Usuario" className="user-icon-head-menu" />
                </div>
            </nav>

            <button className="hamburger-head-menu" onClick={toggleMenu}>
                &#9776; {/* Este es el ícono del menú "hamburger" */}
            </button>
            <button 
                className={`theme-toggle-head-menu ${isDarkMode ? 'dark-theme-toggle-head-menu' : 'light-theme-toggle-head-menu'}`} 
                onClick={toggleTheme}
            >
                {isDarkMode ? (
                    <span role="img" aria-label="Luna">🌤️</span> // Ícono de luna para modo oscuro
                ) : (
                    <span role="img" aria-label="Sol">🌕</span> // Ícono de sol para modo claro
                )}
                <span className={`toggle-indicator ${isDarkMode ? 'on' : 'off'}`}></span>
            </button>
        </header>
    );
};

export default Header;
