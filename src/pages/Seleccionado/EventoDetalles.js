import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './EventoDetalles.css'; 
import Header from '../Home/Header';
import Error from '../Error/Error'; // Asegúrate de importar el componente de error

const EventoDetalles = () => {
    const { id } = useParams(); // Obtiene el ID de los parámetros de la URL
    const navigate = useNavigate(); 
    const [evento, setEvento] = useState(null); // Estado para el evento actual
    const [cantidadEntradas, setCantidadEntradas] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [loading, setLoading] = useState(true); // Indica si se está cargando

    // Carga el evento desde el servidor
    useEffect(() => {
        const fetchEvento = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:4000/evento`);
                if (!response.ok) {
                    throw new Error('Error al obtener el evento');
                }
                const data = await response.json();
                
                // Filtra los eventos para encontrar el evento con el ID correcto
                const eventoEncontrado = data.data.find(event => event.id === id);
                
                if (eventoEncontrado) {
                    setEvento(eventoEncontrado);
                } else {
                    navigate("/error"); // Redirige al usuario a la página de error si no se encuentra el evento
                }
            } catch (err) {
                console.log(err.message); // Solo loguea el error sin cambiar el estado
            } finally {
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id, navigate]);

    // Verifica si el usuario está logueado
    useEffect(() => {
        const user = localStorage.getItem('user'); // Suponiendo que se guarda el usuario en localStorage
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    if (loading) {
        return (
          <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div>
        );
    }

    // Convertir la fecha ISO a formato legible
    const formatoFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(fecha).toLocaleString('es-ES', opciones);
    };

    const handleCompra = () => {
        alert(`Has comprado ${cantidadEntradas} entradas usando PSE. ¡Gracias por tu compra!`);
    };

    return (
        <div className='evento-detalles-sel2'>
            <div className='evento-detalles-sel3'>
                <div className="evento-detalles-sel">
                    <div className="evento-imagen-container-sel">
                        <img className="evento-imagen-sel" src={`http://localhost:4000${evento.imagen_principal}`} alt={evento.nombre} />
                    </div>
                    <div className="evento-info-sel">
                        <h1 className="evento-nombre-sel">{evento.nombre}</h1>
                        <p className="evento-fecha-sel">Fecha: {formatoFecha(evento.fecha_inicio)}</p>
                        <p className="evento-hora-sel">Hora: {formatoFecha(evento.fecha_inicio).split(',')[1]}</p>
                        <p className="evento-lugar-sel">Lugar: {evento.id_lugar}</p>
                        <p className="evento-tipo-sel">Tipo: {evento.categoria}</p>
                        <p className="evento-ciudad-sel">Ciudad: {evento.id_ciudad}</p>
                        
                        {/* Descripción del evento */}
                        <div className="evento-descripcion-sel">
                            <h3>Descripción</h3>
                            <p>{evento.descripcion}</p>
                        </div>

                        <div className="evento-compra-sel">
                            <label htmlFor="cantidad" className="evento-cantidad-label-sel">Cantidad de Entradas:</label>
                            <input 
                                type="number" 
                                id="cantidad" 
                                min="1" 
                                value={cantidadEntradas} 
                                onChange={(e) => setCantidadEntradas(e.target.value)} 
                                className="evento-cantidad-input-sel"
                            />
                            <p className="evento-metodo-pago-sel">Método de pago: PSE</p>
                            
                            {/* Botón deshabilitado si el usuario no está logueado */}
                            <button 
                                className="evento-boton-comprar-sel" 
                                onClick={handleCompra}
                                disabled={!isAuthenticated} // Deshabilita el botón si no está logueado
                            >
                                Comprar Entradas
                            </button>
                            
                            {!isAuthenticated && (
                                <p className="evento-mensaje-login-sel">¡Debes iniciar sesión para comprar entradas!</p>
                            )}
                        </div>

                        <button className="evento-boton-volver-sel" onClick={() => navigate(-1)}>Volver</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventoDetalles;
