import React, { useState } from 'react';

const eventos = [
    {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },  {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },  {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },  {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },  {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },  {
        id: 1,
        nombre: 'Concierto de Rock',
        fecha: '28 octubre 2024',
        hora: '6:00pm',
        lugar: 'Auditorio',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },
    {
        id: 2,
        nombre: 'Festival de Jazz',
        fecha: '15 noviembre 2024',
        hora: '8:00pm',
        lugar: 'Teatro Principal',
        tipo: 'Concierto',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },
    {
        id: 3,
        nombre: 'Obra de Teatro: La Vida es Sueño',
        fecha: '5 diciembre 2024',
        hora: '7:30pm',
        lugar: 'Teatro Municipal',
        tipo: 'Teatro',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },
    {
        id: 4,
        nombre: 'Obra de Teatro: La Vida es Sueño2222',
        fecha: '5 diciembre 2024',
        hora: '7:30pm',
        lugar: 'Teatro Municipal',
        tipo: 'Teatro',
        ciudad: 'Carranga',
        imagen: require('../Images/fondo.jpg'), // Cambia esta URL a la imagen correcta
    },
];

const Eventos = () => {
    const [visibleEventos, setVisibleEventos] = useState(3);

    // Manejador para mostrar más eventos
    const handleVerMas = () => {
        setVisibleEventos(prev => prev + 3); // Muestra 3 eventos más
    };

    return (
        <div className="principal-div">
            <br />
            <h1 className="titles1">Eventos</h1>
            <br />
            <div className="Botones">
                <button>CONCIERTOS</button>
                <button>TEATRO</button>
                <button>DEPORTES</button>
                <button>DESTACADOS</button>
                <button>TODOS</button>
            </div>

            {/* Contenedor de tarjetas de eventos */}
            <div className="eventos-grid">
                {/* Mostrar solo los eventos según visibleEventos */}
                {eventos.slice(0, visibleEventos).map((evento) => (
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
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón "Ver más" solo si hay más eventos por mostrar */}
            {visibleEventos < eventos.length && (
                <div className="ver-mas-container">
                    <button onClick={handleVerMas} className="ver-mas-btn">Ver más</button>
                    
                </div>
            )}
            <br/>
        </div>
    );
};

export default Eventos;
