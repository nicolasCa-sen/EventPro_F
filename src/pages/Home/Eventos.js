import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Eventos.css';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [visibleEventos, setVisibleEventos] = useState(3);
    const [filtro, setFiltro] = useState('TODOS');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener eventos del backend
    const fetchEventos = async () => {
        try {
            const response = await fetch('http://localhost:4000/evento');
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
                    imagen: evento.imagen_principal,
                    categoria: evento.categoria,
                }));

            setEventos(adaptados);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect con polling para actualizar los eventos
    useEffect(() => {
        fetchEventos(); // Llamada inicial para cargar los eventos
        const interval = setInterval(() => {
            fetchEventos(); // Llamada periódica
        }, 10000); // Cada 10 segundos

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, []);

    const handleVerMas = () => {
        setVisibleEventos(prev => prev + 3);
    };

    const handleFiltro = (tipo) => {
        setFiltro(tipo);
        setVisibleEventos(3);
    };

    // Obtener tipos únicos de eventos, ignorando categorías indefinidas
    const tiposUnicos = Array.from(
        new Set(eventos.map(evento => evento.categoria).filter(categoria => categoria))
    );

    const eventosFiltrados = eventos.filter(evento =>
        filtro === 'TODOS' || evento.categoria === filtro
    );

    if (loading) {
        return <p>Cargando eventos...</p>;
    }

    if (error) {
        return <p>Error al cargar eventos: {error}</p>;
    }

    return (
        <div className="principal-div">
            <br />
            <h1 className="titles1">Eventos</h1>
            <br />
            <div className="Botones">
                {tiposUnicos.map((tipo, index) => (
                    <button key={index} onClick={() => handleFiltro(tipo)}>
                        {tipo.toUpperCase()}
                    </button>
                ))}
                <button onClick={() => handleFiltro('TODOS')}>TODOS</button>
            </div>

            <div className="eventos-grid">
                {eventosFiltrados.slice(0, visibleEventos).map((evento) => (
                    <div key={evento.id} className="cardEvento">
                        <div
                            className="carta-imagen"
                            style={{ backgroundImage: `url(${evento.imagen})` }}
                        ></div>
                        <div className="carta-contenido">
                            <h2>{evento.nombre}</h2>
                            <p>{evento.descripcion}</p>
                            <p>Fecha inicio: {evento.fechaInicio} a las {evento.horaInicio}</p>
                            <p>Fecha fin: {evento.fechaFin} a las {evento.horaFin}</p>
                            <p>Categoría: {evento.categoria}</p>
                            <Link to={`/evento/${evento.id}`} className="saber-mas-btn">
                                Saber más
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {visibleEventos < eventosFiltrados.length && (
                <div className="ver-mas-container">
                    <button onClick={handleVerMas} className="ver-mas-btn">Ver más</button>
                </div>
            )}
            <br />
        </div>
    );
};

export default Eventos;
