import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './Carrusel.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Carrusel = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                        imagen: `http://localhost:4000${evento.imagen_principal}`, 
                        categoria: evento.categoria,
                    }));

                setEventos(adaptados);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    if (loading) {
        return <p>Cargando eventos...</p>;
    }

    if (error) {
        return <p>Error al cargar eventos: {error}</p>;
    }

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
        <h1 className="titles1" style={{ color: 'white' }}>Próximos Eventos</h1>
            <Slider {...settings}>
                {eventos.map((evento) => (
                    <div key={evento.id} className="cardEvento">
                        <div
                            className="carta-imagen"
                            style={{ backgroundImage: `url(${evento.imagen})` }}
                        />
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
            </Slider>
        </div>
    );
};

export default Carrusel;
