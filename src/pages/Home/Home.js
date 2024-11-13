import './Home.css';
import './Eventos.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png'; // Ruta al logo
import userImage from '../Images/logo.png'; // Ruta a la imagen del usuario
import Carrusel from './Carrusel'; // Importa el componente Carrusel
import Eventos from './Eventos';
import Header from './Header';
import Inicio from './Inicio';

function Home() {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú
    const navigate = useNavigate(); // Usar useNavigate para la navegación

    // Crear una referencia al carrusel
    const carruselRef = useRef(null);

    const eventosRef = useRef(null);

    const inicioRef = useRef(null);

    const goToApp = () => {
        navigate('/app'); // Navegar a /app
    };

    // Alternar la visibilidad del menú en pantallas pequeñas
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Función para hacer scroll al carrusel
    const scrollToCarrusel = () => {
        if (carruselRef.current) {
            carruselRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToEventos = () => {
        if (eventosRef.current) {
            eventosRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToInicio = () => {
        if (inicioRef.current) {
            inicioRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="Home"ref={inicioRef}>
            {/* Pasamos la función scrollToCarrusel al Header 
           <Header scrollToCarrusel={scrollToCarrusel} scrollToEventos={scrollToEventos}scrollToInicio={scrollToInicio}/>
*/}
            <Inicio />

            {/* Cuerpo principal de Home */}
            <div className="Home-body-carrucel">
                <br />
                
                {/* CARRUSEL */}
                <div ref={carruselRef}>
                <h1 className="titles">Próximos Eventos</h1>
                <br />
                    <Carrusel />
                </div>
                <br />
            </div>
            <div className="Home-body-events">
                <br />  
                <div ref={eventosRef}>
               
                <Eventos />
                </div>
                <br />
            </div>

            {/* Sección de pie de página */}
            <footer className="Home-footer">
                <p>© 2024 EvenT Proo. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Home;
