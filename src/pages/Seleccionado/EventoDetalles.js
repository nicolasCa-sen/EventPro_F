import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventoDetalles.css';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { useTheme } from '../../context/ThemeContext'; // Importa el contexto

const EventoDetalles = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { isDarkMode } = useTheme(); // Obtener el estado del tema
    const [evento, setEvento] = useState(null);
    const [cantidadEntradas, setCantidadEntradas] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://eventpro-b.onrender.com/evento`);
                if (!response.ok) {
                    throw new Error('Error al obtener el evento');
                }
                const data = await response.json();
                
                const eventoEncontrado = data.data.find(event => event.id === id);
                
                if (eventoEncontrado) {
                    setEvento(eventoEncontrado);
                } else {
                    navigate("/error");
                }
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id, navigate]);

    useEffect(() => {
        const user = localStorage.getItem('user');
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

    const formatoFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(fecha).toLocaleString('es-ES', opciones);
    };

    const precioTotal = evento ? 2000 * cantidadEntradas : 0;

    const imprimirInforme = async () => {
        const doc = new jsPDF();
        const eventoImagenURL = `https://eventpro-b.onrender.com${evento.imagen_principal}`;
        const eventoImagenBase64 = await convertToBase64(eventoImagenURL).catch((e) => {
            console.error("Error al convertir la imagen del evento a Base64:", e);
            return null;
        });

        const qrWidth = 40;
        const qrHeight = 40;
        const qrSpacing = 10;
        const maxColumns = 4;
        const maxRows = 3;
        const maxEntriesPerPage = maxColumns * maxRows;
        const qrMarginX = 10;
        const qrMarginY = 12 ;
        let posX = qrMarginX;
        let posY = qrMarginY;
        let entriesOnPage = 0;
        let totalPages = Math.ceil(cantidadEntradas / maxEntriesPerPage);

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            if (pageNumber > 1) {
                doc.addPage();
            }

            doc.setFillColor(20, 39, 34);
            doc.rect(0, 0, 210, 30, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor(255, 255, 255);
            doc.text("Event Pro - Confirmación de Compra", 105, 20, { align: "center" });

            if (eventoImagenBase64) {
                doc.addImage(eventoImagenBase64, "PNG", 10, 40, 60, 40);
            }

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Evento: ${evento.nombre}`, 80, 50);
            doc.text(`Fecha: ${formatoFecha(evento.fecha_inicio)}`, 80, 60);
            doc.text(`Lugar: ${evento.id_lugar}`, 80, 70);
            doc.text(`Entradas compradas: ${cantidadEntradas}`, 80, 80);
            doc.text(`Precio Total: $${precioTotal}`, 80, 90);

            doc.setDrawColor(0, 0, 0);
            doc.line(10, 100, 200, 100);

            for (let i = 1; i <= maxEntriesPerPage; i++) {
                const entryIndex = (pageNumber - 1) * maxEntriesPerPage + i;
                if (entryIndex > cantidadEntradas) break;

                const qrData = JSON.stringify({
                    eventoId: evento.id,
                    eventoNombre: evento.nombre,
                    entrada: entryIndex,
                });

                const qrCodeDataUrl = await QRCode.toDataURL(qrData);

                doc.text(`Entrada ${entryIndex}`, posX, posY - 5);
                doc.addImage(qrCodeDataUrl, "PNG", posX, posY, qrWidth, qrHeight);

                posX += qrWidth + qrSpacing;

                if (i % maxColumns === 0) {
                    posX = qrMarginX;
                    posY += qrHeight + qrSpacing + 5;
                }
            }

            doc.setFontSize(10);
            doc.text(`Página ${pageNumber} de ${totalPages}`, 105, 290, { align: "center" });

            entriesOnPage = 0;
            posX = qrMarginX;
            posY = qrMarginY;
        }

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const pdfWindow = window.open(pdfUrl, '_blank');
        if (pdfWindow) {
            pdfWindow.focus();
        }

        alert('El PDF está listo. Si deseas descargarlo, puedes usar el botón en la ventana emergente.');
    };

    const convertToBase64 = (url) => {
        return fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            });
    };

    const handleCompra = () => {
        if (isAuthenticated) {
            imprimirInforme();
            alert(`Has comprado ${cantidadEntradas} entradas por un total de $${precioTotal}. El archivo PDF ha sido generado.`);
        } else {
            alert('¡Debes iniciar sesión para comprar entradas!');
        }
    };

    return (
        <div className={`evento-detalles-sel2 ${isDarkMode ? 'dark' : 'light'}`}> {/* Agregado el cambio de tema */}
            <div className={`evento-detalles-sel3 ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="evento-detalles-sel">
                    <div className="evento-imagen-container-sel">
                        <img className="evento-imagen-sel" src={`https://eventpro-b.onrender.com${evento.imagen_principal}`} alt={evento.nombre} />
                    </div>
                    <div className={`evento-info-sel ${isDarkMode ? 'dark' : 'light'}`}>
                        <h1 className="evento-nombre-sel">{evento.nombre}</h1>
                        <p className="evento-fecha-sel">Fecha: {formatoFecha(evento.fecha_inicio)}</p>
                        <p className="evento-hora-sel">Hora: {formatoFecha(evento.fecha_inicio).split(',')[1]}</p>
                        <p className="evento-lugar-sel">Lugar: {evento.id_lugar}</p>
                        <p className="evento-tipo-sel">Tipo: {evento.categoria}</p>
                        <p className="evento-ciudad-sel">Ciudad: {evento.id_ciudad}</p>

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

                            <p className="evento-precio-total-sel">Precio Total: ${precioTotal}</p>

                            <button 
                                className="evento-boton-comprar-sel" 
                                onClick={handleCompra}
                                disabled={!isAuthenticated}
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
