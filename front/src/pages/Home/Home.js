import './Home.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png'; // Ruta al logo
import userImage from '../Images/logo.png'; // Ruta a la imagen del usuario

function Home() {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú
    const navigate = useNavigate(); // Usar useNavigate para la navegación

    const goToApp = () => {
        navigate('/app'); // Navegar a /app
    };

    // Alternar la visibilidad del menú en pantallas pequeñas
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="Home">
            {/* Encabezado fijo en la parte superior */}
            <div className="static-header">
                <img src={logo} alt="Logo" className="app-logo" />

                {/* Botón de menú para pantallas pequeñas */}
                <button className="menu-button" onClick={toggleMenu}>
                    &#9776;
                </button>

                {/* Contenedor para los botones y la imagen */}
                <div className={`header-buttons ${menuOpen ? 'open' : ''}`}>
                    <button className="header-button">INICIO</button>
                    <button className="header-button">CONCIERTOS</button>
                    <button className="header-button">TEATRO</button>
                    <button className="header-button">DEPORTES</button>
                    <button className="header-button">TODOS</button>
                    <img src={userImage} alt="Usuario" className="user-image" />
                </div>
            </div>

            <header className="Home-header">
                <div className="container">
                    <div className="box box1">
                        <div className="text">EvenT</div>
                        <div className="text">Proo</div>
                        <div className="text1">
                            En EvenT Proo, hacemos que cada momento cuente. Desde conciertos electrizantes hasta eventos deportivos emocionantes, nuestra plataforma te conecta con las mejores experiencias de entretenimiento.
                        </div>
                    </div>
                    <div className="box box2">
                        <center>
                            <div className="cd-container">

                            </div>
                        </center>
                    </div>
                </div>
            </header>

            {/* Cuerpo principal de Home */}
            <div className="Home-body"></div>

            {/* Sección de pie de página */}
            <footer className="Home-footer">
                <p>© 2024 EvenT Proo. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Home;
