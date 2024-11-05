import React from 'react';
import Slider from 'react-slick';
import './Carrusel.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

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
    },{
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
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 tarjetas por defecto
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const Carrusel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="carrusel-container">
            <Slider {...settings}>
                {eventos.map((evento) => (
                    <div key={evento.id} className="cardEvento">
                        <div
                            className="carta-imagen"
                            style={{ backgroundImage: `url(${evento.imagen})` }}
                        />
                        <div className="carta-contenido">
                            <h2>{evento.nombre}</h2>
                            <p>{evento.fecha}</p>
                            <p>{evento.hora}</p>
                            <p>{evento.lugar}</p>
                            <p>{evento.tipo}</p>
                            <p>{evento.ciudad}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
{eventos.map((evento) => (
    <div key={evento.id} className="carta-wrapper">
        <div className="cardEvento">
            <div
                className="carta-imagen"
                style={{ backgroundImage: `url(${evento.imagen})` }}
            />
            <div className="carta-contenido">
                <h2>{evento.nombre}</h2>
                <p>{evento.fecha}</p>
                <p>{evento.hora}</p>
                <p>{evento.lugar}</p>
                <p>{evento.tipo}</p>
                <p>{evento.ciudad}</p>
            </div>
        </div>
    </div>
))}

export default Carrusel;
