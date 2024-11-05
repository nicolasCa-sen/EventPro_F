import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './Eventos.css';

const eventos = [
    {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/2893330/pexels-photo-2893330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 2,
        nombre: 'Obra de Teatro: La Casa de Bernarda Alba',
        fecha: '5 noviembre 2024',
        hora: '8:00pm',
        lugar: 'Teatro Municipal',
        tipo: 'Teatro',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 3,
        nombre: 'Partido de Fútbol: Local vs Visitante',
        fecha: '10 noviembre 2024',
        hora: '4:00pm',
        lugar: 'Estadio Central',
        tipo: 'Cultura',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/3813798/pexels-photo-3813798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 4,
        nombre: 'Festival de Jazz',
        fecha: '15 noviembre 2024',
        hora: '7:00pm',
        lugar: 'Plaza Principal',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/3763994/pexels-photo-3763994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 5,
        nombre: 'Cine: Estreno de Película',
        fecha: '20 noviembre 2024',
        hora: '9:00pm',
        lugar: 'Cine Carranga',
        tipo: 'Cine',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/1039433/pexels-photo-1039433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 6,
        nombre: 'Maratón de Lectura',
        fecha: '25 noviembre 2024',
        hora: '10:00am',
        lugar: 'Biblioteca Municipal',
        tipo: 'Literario',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/3019184/pexels-photo-3019184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 7,
        nombre: 'Competencia de Danza',
        fecha: '30 noviembre 2024',
        hora: '5:00pm',
        lugar: 'Centro Cultural',
        tipo: 'Cultura',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/1704124/pexels-photo-1704124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 8,
        nombre: 'Exposición de Arte Contemporáneo',
        fecha: '5 diciembre 2024',
        hora: '6:00pm',
        lugar: 'Museo de Arte',
        tipo: 'Cultura',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/1048279/pexels-photo-1048279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 9,
        nombre: 'Conferencia sobre Tecnología',
        fecha: '10 diciembre 2024',
        hora: '3:00pm',
        lugar: 'Auditorio Tecnológico',
        tipo: 'Conferencia',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/3184392/pexels-photo-3184392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 10,
        nombre: 'Fiesta de Fin de Año',
        fecha: '31 diciembre 2024',
        hora: '10:00pm',
        lugar: 'Club Social',
        tipo: 'Fiesta',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/1988899/pexels-photo-1988899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 11,
        nombre: 'Taller de Fotografía',
        fecha: '15 diciembre 2024',
        hora: '1:00pm',
        lugar: 'Centro Cultural',
        tipo: 'Taller',
        ciudad: 'Carranga',
        imagen: 'https://images.pexels.com/photos/1029597/pexels-photo-1029597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];

const Eventos = () => {
    const [visibleEventos, setVisibleEventos] = useState(3);
    const [filtro, setFiltro] = useState('TODOS');

    const handleVerMas = () => {
        setVisibleEventos(prev => prev + 3);
    };

    const handleFiltro = (tipo) => {
        setFiltro(tipo);
        setVisibleEventos(3); // Reinicia el número de eventos visibles al aplicar un filtro
    };

    // Obtener tipos únicos de eventos
    const tiposUnicos = Array.from(new Set(eventos.map(evento => evento.tipo)));

    const eventosFiltrados = eventos.filter(evento => 
        filtro === 'TODOS' || evento.tipo === filtro
    );

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
                            <p>Fecha: {evento.fecha}</p>
                            <p>Hora: {evento.hora}</p>
                            <p>Lugar: {evento.lugar}</p>
                            <p>Tipo: {evento.tipo}</p>
                            <p>Ciudad: {evento.ciudad}</p>
                            <Link to={`/evento/${evento.id}`} className="saber-mas-btn"> {/* Usa Link en vez de button */}
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
