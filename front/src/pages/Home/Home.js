import './Home.css';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';

function Home() {
    const navigate = useNavigate(); // Usar useNavigate para la navegación

    const goToApp = () => {
        navigate('/app'); // Navegar a /app
    };

    return (
        <div className="Home">
            {/* Encabezado fijo en la parte superior */}
            <div className="static-header">
                <img src={logo} alt="Logo" className="app-logo" />
                <h1>EvenT Proo</h1>

            </div>

            <header className="Home-header">
                <div className="container">
                    <div className="box box1">
                        <div className="text">EvenT</div>
                        <div className="text">Proo</div>
                        <div className="text1">En EvenT Proo, hacemos que cada momento cuente. Desde conciertos electrizantes hasta eventos deportivos emocionantes, nuestra plataforma te conecta con las mejores experiencias de entretenimiento.</div>
                        
                    </div>
                    <div className="box box2">
                        <center>
                            <div className="one-div"></div>
                            <button onClick={goToApp} className="learn-more">
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                          
                            <span className="button-text">Ver más</span>
                        </button>
                        </center>
                    </div>
                </div>
            </header>


            {/* Cuerpo principal de Home */}
            <div className="Home-body">

            </div>

            {/* Sección de pie de página u otros elementos opcionales */}
            <footer className="Home-footer">
                <p>© 2024 EvenT Proo. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Home;
