import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventoDetalles.css';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

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
                const response = await fetch(`https://eventpro-b.onrender.com/evento`);
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

    // Calcular precio total
    const precioTotal = evento ? 2000 * cantidadEntradas : 0;

    // Función para generar el PDF de compra
    const imprimirInforme = async () => {
        const doc = new jsPDF();
    
        // URL de la imagen principal del evento
        const eventoImagenURL = `https://eventpro-b.onrender.com${evento.imagen_principal}`;
    
        // Convertir imágenes a Base64
        const eventoImagenBase64 = await convertToBase64(eventoImagenURL).catch((e) => {
            console.error("Error al convertir la imagen del evento a Base64:", e);
            return null;
        });
    
        // Definir las dimensiones y márgenes
        const qrWidth = 40;  // Ancho de cada QR
        const qrHeight = 40; // Alto de cada QR
        const qrSpacing = 10; // Espaciado entre QR
        const maxColumns = 4; // 4 columnas por página
        const maxRows = 3; // 3 filas por página
        const maxEntriesPerPage = maxColumns * maxRows; // 12 entradas por página
        const qrMarginX = 10; // Margen izquierdo
        const qrMarginY = 12 ; // Nueva posición superior para los QR (después de 200)
        let posX = qrMarginX; // Posición inicial X
        let posY = qrMarginY; // Posición inicial Y
        let entriesOnPage = 0; // Contador de entradas por página
        let totalPages = Math.ceil(cantidadEntradas / maxEntriesPerPage); // Total de páginas
    
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            // Iniciar una nueva página si no es la primera
            if (pageNumber > 1) {
                doc.addPage();
            }
    
            // Encabezado
            doc.setFillColor(20, 39, 34); // Fondo negro
            doc.rect(0, 0, 210, 30, "F"); // Dibujar rectángulo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.text("Event Pro - Confirmación de Compra", 105, 20, { align: "center" });
    
            // Imagen del evento
            if (eventoImagenBase64) {
                doc.addImage(eventoImagenBase64, "PNG", 10, 40, 60, 40); // Ajustar tamaño y posición
            }
    
            // Información del evento
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Texto negro
            doc.text(`Evento: ${evento.nombre}`, 80, 50);
            doc.text(`Fecha: ${formatoFecha(evento.fecha_inicio)}`, 80, 60);
            doc.text(`Lugar: ${evento.id_lugar}`, 80, 70);
            doc.text(`Entradas compradas: ${cantidadEntradas}`, 80, 80);
            doc.text(`Precio Total: $${precioTotal}`, 80, 90);
    
            // Línea separadora
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 100, 200, 100);
    
            // Generar los QR por página
            for (let i = 1; i <= maxEntriesPerPage; i++) {
                const entryIndex = (pageNumber - 1) * maxEntriesPerPage + i; // Índice de la entrada
    
                // Si el índice de entrada excede la cantidad de entradas, terminamos
                if (entryIndex > cantidadEntradas) break;
    
                const qrData = JSON.stringify({
                    eventoId: evento.id,
                    eventoNombre: evento.nombre,
                    entrada: entryIndex,
                });
    
                const qrCodeDataUrl = await QRCode.toDataURL(qrData); // Generar QR en formato Data URL
    
                // Agregar número de entrada
                doc.text(`Entrada ${entryIndex}`, posX, posY - 5); // Un poco por encima del QR
    
                // Agregar código QR
                doc.addImage(qrCodeDataUrl, "PNG", posX, posY, qrWidth, qrHeight);
    
                // Actualizar la posición para la siguiente entrada
                posX += qrWidth + qrSpacing; // Mover hacia la derecha
    
                // Si llegamos al límite de columnas, movernos a la siguiente fila
                if (i % maxColumns === 0) {
                    posX = qrMarginX; // Resetear posición X
                    posY += qrHeight + qrSpacing + 5; // Mover hacia abajo con un poco de espacio extra
                }
            }
    
            // Agregar numeración de páginas
            doc.setFontSize(10);
            doc.text(`Página ${pageNumber} de ${totalPages}`, 105, 290, { align: "center" });
    
            // Si se han generado todas las entradas en la página, preparar la siguiente
            entriesOnPage = 0;
            posX = qrMarginX;
            posY = qrMarginY;
        }
    
        // Mostrar el PDF en una nueva ventana
        const pdfBlob = doc.output('blob'); // Obtener el PDF como un Blob
        const pdfUrl = URL.createObjectURL(pdfBlob); // Crear una URL para el Blob
        const pdfWindow = window.open(pdfUrl, '_blank'); // Abrir el PDF en una nueva ventana
        if (pdfWindow) {
            pdfWindow.focus(); // Enfocar la ventana emergente
        }
    
        // También se puede mostrar un botón de descarga si se desea
        alert('El PDF está listo. Si deseas descargarlo, puedes usar el botón en la ventana emergente.');
    };
    
    
    
    

    // Función para convertir imágenes a Base64
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
        // Si está autenticado, genera el PDF de compra
        if (isAuthenticated) {
            imprimirInforme();
            alert(`Has comprado ${cantidadEntradas} entradas por un total de $${precioTotal}. El archivo PDF ha sido generado.`);
        } else {
            alert('¡Debes iniciar sesión para comprar entradas!');
        }
    };

    return (
        <div className='evento-detalles-sel2'>
            <div className='evento-detalles-sel3'>
                <div className="evento-detalles-sel">
                    <div className="evento-imagen-container-sel">
                        <img className="evento-imagen-sel" src={`https://eventpro-b.onrender.com${evento.imagen_principal}`} alt={evento.nombre} />
                    </div>
                    <div className="evento-info-sel">
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
