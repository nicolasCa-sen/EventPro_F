import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './EventoDetalles.css'; 

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


const EventoDetalles = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Usa useNavigate para la navegación
    const evento = eventos.find(e => e.id === parseInt(id));

    if (!evento) {
        return <h2>Evento no encontrado</h2>;
    }

    return (
        <div>
            <h1>{evento.nombre}</h1>
            <img src={evento.imagen} alt={evento.nombre} />
            <p>Fecha: {evento.fecha}</p>
            <p>Hora: {evento.hora}</p>
            <p>Lugar: {evento.lugar}</p>
            <p>Tipo: {evento.tipo}</p>
            <p>Ciudad: {evento.ciudad}</p>
            <button onClick={() => navigate(-1)}>Volver</button> {/* Ejemplo de navegación */}
        </div>
    );
};

export default EventoDetalles;
