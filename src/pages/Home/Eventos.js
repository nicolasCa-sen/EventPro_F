import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext'; // Importamos el hook de tema
import './Eventos.css';

const Eventos = () => {
    const { isDarkMode } = useTheme(); // Accedemos al estado del tema
    const [eventos, setEventos] = useState([]);
    const [visibleEventos, setVisibleEventos] = useState(3);
    const [filtro, setFiltro] = useState('TODOS');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEventos = async () => {
        try {
            const response = await fetch('https://eventpro-b.onrender.com/evento');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const json = await response.json();

            const adaptados = json.data
                .filter(evento => evento.activo && !evento.vendido)
                .map(evento => ({
                    id: evento.id,
                    nombre: evento.nombre,
                    descripcion: evento.descripcion,
                    fechaInicio: new Date(evento.fecha_inicio).toLocaleDateString('es-CO'),
                    horaInicio: new Date(evento.fecha_inicio).toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    fechaFin: new Date(evento.fecha_fin).toLocaleDateString('es-CO'),
                    horaFin: new Date(evento.fecha_fin).toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    imagen: `https://eventpro-b.onrender.com${evento.imagen_principal}`, 
                    categoria: evento.categoria,
                }));

            setEventos(adaptados);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
        const interval = setInterval(() => {
            fetchEventos();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleVerMas = () => {
        setVisibleEventos(prev => prev + 3);
    };

    const handleFiltro = (tipo) => {
        setFiltro(tipo);
        setVisibleEventos(3);
    };

    const tiposUnicos = Array.from(
        new Set(eventos.map(evento => evento.categoria).filter(categoria => categoria))
    );

    const eventosFiltrados = eventos.filter(evento =>
        filtro === 'TODOS' || evento.categoria === filtro
    );

    if (loading) {
        return <div className="card">
            <div className="loader">
                <p>loading</p>
                <div className="words">
                    <span className="word">buttons</span>
                    <span className="word">forms</span>
                    <span className="word">switches</span>
                    <span className="word">cards</span>
                    <span className="word">buttons</span>
                </div>
            </div>
        </div>;
    }

    if (error) {
        return <p>Error al cargar eventos: {error}</p>;
    }

    return (
        <div className={`principal-div ${isDarkMode ? 'dark' : 'light'}`}> {/* Aplicamos la clase de tema */}
            <br />
            <h1 className={`titles1 ${isDarkMode ? 'dark' : 'light'}`}>Eventos</h1>
            <br />
            <div className="Botones">
                {tiposUnicos.map((tipo, index) => (
                    <button key={index} onClick={() => handleFiltro(tipo)} className={isDarkMode ? 'dark' : 'light'}>
                        {tipo.toUpperCase()}
                    </button>
                ))}
                <button onClick={() => handleFiltro('TODOS')} className={isDarkMode ? 'dark' : 'light'}>TODOS</button>
            </div>

            <div className="eventos-grid">
                {eventosFiltrados.slice(0, visibleEventos).map((evento) => {
                    return (
                        <div key={evento.id} className={`cardEvento ${isDarkMode ? 'dark' : 'light'}`}>
                            <div
                                className="carta-imagen"
                                style={{ backgroundImage: `url(${evento.imagen})` }}
                            ></div>
                            <div className="carta-contenido">
                                <h2 className={isDarkMode ? 'dark' : 'light'}>{evento.nombre}</h2>
                                <p className={isDarkMode ? 'dark' : 'light'}>{evento.descripcion}</p>
                                <p className={isDarkMode ? 'dark' : 'light'}>Fecha inicio: {evento.fechaInicio} a las {evento.horaInicio}</p>
                                <p className={isDarkMode ? 'dark' : 'light'}>Fecha fin: {evento.fechaFin} a las {evento.horaFin}</p>
                                <p className={isDarkMode ? 'dark' : 'light'}>Categoría: {evento.categoria}</p>
                                <Link to={`/evento/${evento.id}`} className={`saber-mas-btn ${isDarkMode ? 'dark' : 'light'}`}>
                                    Saber más
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {visibleEventos < eventosFiltrados.length && (
                <div className="ver-mas-container">
                    <button onClick={handleVerMas} className={`ver-mas-btn ${isDarkMode ? 'dark' : 'light'}`}>Ver más</button>
                </div>
            )}
            <br />
        </div>
    );
};

export default Eventos;
