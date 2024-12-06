import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPrint, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import UpdateEventModal from './UpdateEventModal';
import './Table.css';
import { jsPDF } from "jspdf";
import logo from '../Images/logo.png';
import QRCode from "qrcode";

const Table = () => {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState(''); // Tipo de filtro
  const [busqueda, setBusqueda] = useState(''); // Término de búsqueda
  const [datosFiltrados, setDatosFiltrados] = useState([]); // Datos filtrados para mostrar en la tabla
  const [selectedEvento, setSelectedEvento] = useState(null); // Evento seleccionado para actualizar
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Controlar la visibilidad del modal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Posición del modal

  // Cargar los datos desde la API al montar el componente
  useEffect(() => {
    fetch('http://localhost:4000/evento')
      .then((response) => response.json())
      .then((data) => {
        setDatos(data.data);
        setDatosFiltrados(data.data); // Inicializar datosFiltrados con todos los eventos
      })
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  const idsDisponibles = [...new Set(datos.map((evento) => evento.id))];
  const lugaresDisponibles = [...new Set(datos.map((evento) => evento.id_lugar))];

  const eliminarEvento = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        const response = await fetch(`http://localhost:4000/evento/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setDatos((prevDatos) => prevDatos.filter((evento) => evento.id !== id));
          setDatosFiltrados((prevDatos) =>
            prevDatos.filter((evento) => evento.id !== id)
          );
          alert('Evento eliminado correctamente.');
        } else {
          const errorData = await response.json();
          alert(`Error al eliminar el evento: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        alert('Hubo un problema al intentar eliminar el evento.');
      }
    }
  };

  const handleOpenUpdateModal = (evento, event) => {
    // Obtener la posición del botón de actualización
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.top - 150, left: rect.left }); // Ajusta el top según lo necesites

    setSelectedEvento(evento);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedEvento(null);
  };

  const handleUpdateEvento = (eventoActualizado) => {
    setDatos(
      datos.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    );
    setDatosFiltrados(
      datosFiltrados.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    );
    handleCloseUpdateModal();
  };

  const handleSearch = () => {
    if (filtro === 'fecha') {
      const filtrados = datos.filter((evento) =>
        evento.fecha_inicio.includes(busqueda)
      );
      setDatosFiltrados(filtrados);
    } else if (filtro === 'id') {
      const filtrados = datos.filter(
        (evento) => evento.id.toString() === busqueda
      );
      setDatosFiltrados(filtrados);
    } else if (filtro === 'lugar') {
      const filtrados = datos.filter(
        (evento) => evento.id_lugar.toString() === busqueda
      );
      setDatosFiltrados(filtrados);
    } else if (filtro === 'nombre') {
      const filtrados = datos.filter((evento) =>
        evento.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setDatosFiltrados(filtrados);
    } else {
      setDatosFiltrados(datos); // Restablecer si no hay filtro válido
    }
  };

  const handleVerTodos = () => {
    setFiltro('');
    setBusqueda('');
    setDatosFiltrados(datos); // Restablecer los datos filtrados
  };
  
  const imprimirInforme = async (evento) => {
    const doc = new jsPDF();
    
    // URL de la imagen principal del evento
    const eventoImagenURL = `http://localhost:4000${evento.imagen_principal}`;
    
    // Convertir imágenes a Base64
    const logoBase64 = await convertToBase64(logo).catch((e) => {
      console.error("Error al convertir el logo a Base64:", e);
      return null;
    });
  
    const eventoImagenBase64 = await convertToBase64(eventoImagenURL).catch((e) => {
      console.error("Error al convertir la imagen del evento a Base64:", e);
      return null;
    });
  
    // Estilizar encabezado
    if (logoBase64) {
      doc.setFillColor(20, 39, 34); // Fondo negro
      doc.rect(0, 0, 210, 30, "F"); // Dibujar rectángulo
      doc.addImage(logoBase64, "PNG", 10, 5, 20, 20); // Agregar logo
    }
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(255, 255, 255); // Texto blanco
    doc.text("Event Pro", 40, 20);
  
    // Título del informe
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Texto negro
    doc.text(evento.nombre.toUpperCase(), 105, 50, { align: "center" });
  
    // Línea separadora
    doc.setDrawColor(0, 0, 0); // Línea negra
    doc.line(10, 60, 200, 60);
  
    // Datos del evento
    const datos = [
      `ID: ${evento.id}`,
      `Descripción: ${evento.descripcion}`,
      `Fecha de Inicio: ${evento.fecha_inicio}`,
      `Fecha de Fin: ${evento.fecha_fin}`,
      `Lugar: ${evento.id_lugar}`,
      `Activo: ${evento.activo ? "Sí" : "No"}`,
      `Vendido: ${evento.vendido ? "Sí" : "No"}`,
    ];
  
    let posY = 80;
    const rowHeight = 8;
    const pageHeight = 297; // Altura de la página en mm
    const marginTop = 60; // Margen superior (debajo del encabezado)
    const maxRowsPerPage = Math.floor((pageHeight - marginTop) / rowHeight); // Número máximo de filas que caben por página
  
    // Imprimir los datos del evento
    datos.forEach((linea) => {
      if (posY + rowHeight > pageHeight) {
        doc.addPage(); // Agregar nueva página si no hay espacio
        posY = marginTop; // Resetear la posición Y
      }
      if (typeof linea === 'string' && linea.trim() !== '') {  // Validar si 'linea' es una cadena no vacía
        doc.text(linea, 10, posY);
      }
      posY += rowHeight;
    });
  
    // Obtener datos de la tabla (recibo completo)
    const obtenerDatosRecibo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/entrada/evento/${evento.id}/recibo-completo`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del recibo.");
        }
        const data = await response.json();
        if (data.state && Array.isArray(data.data)) {
          return data.data; // Devolver la lista de recibos si existen
        } else {
          console.error("Datos de recibo no válidos.");
          return [];
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
      }
    };
  // Generar Código QR con la información del evento
  const qrData = JSON.stringify({
    id: evento.id,
    nombre: evento.nombre,
    descripcion: evento.descripcion,
    fecha_inicio: evento.fecha_inicio,
    fecha_fin: evento.fecha_fin,
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrData); // Generar el QR en formato Data URL

  // Agregar el código QR al PDF (en la parte inferior derecha, por ejemplo)
  doc.addImage(qrCodeDataUrl, "PNG", 160, 10, 40, 40); // Ajusta las coordenadas y el tamaño según sea necesario

    // Llamar a la función para obtener los datos
    const reciboData = await obtenerDatosRecibo();
  
    // Verificar si reciboData es un array
    if (Array.isArray(reciboData)) {
      // Información simplificada para la tabla
      const tableHeaders = ['N Ticket', 'Disponible', 'Emisión', 'Recibo', 'ID Usuario'];
      const tableData = reciboData.map(item => [
        item.numero_ticket,
        item.disponible ? "Si" : "No",
        item.fecha_emision,
        item.numero_recibo,
        item.id_usuario
      ]);
  
      // Dibujar encabezado de la tabla
      let startY = posY + 10;
      tableHeaders.forEach((header, index) => {
        if (startY + rowHeight > pageHeight) {
          doc.addPage(); // Agregar nueva página si no hay espacio
          startY = marginTop;
        }
        doc.setFont("helvetica", "bold");
        if (typeof header === 'string' && header.trim() !== '') {  // Validar el encabezado
          doc.text(header, 10 + index * 40, startY);
        }
      });
  
      startY += rowHeight;
  
      // Dibujar el cuerpo de la tabla
      tableData.forEach((row) => {
        row.forEach((cell, index) => {
          if (startY + rowHeight > pageHeight) {
            doc.addPage(); // Agregar nueva página si no hay espacio
            startY = marginTop;
          }
          doc.setFont("helvetica", "normal");
          if (typeof cell === 'string' && cell.trim() !== '') {  // Validar el contenido de las celdas
            doc.text(cell, 10 + index * 40, startY);
          }
        });
        startY += rowHeight;
      });
    } else {
      console.error("No se pudieron obtener datos válidos para la tabla.");
    }
  
    
    // Mostrar en ventana de impresión
    const pdfBlob = doc.output("blob");
    const pdfURL = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfURL);
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.focus();
        // printWindow.print();
      });
    }
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

// Función para crear una imagen circular usando Canvas
const makeCircularImage = (imageBase64, size) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = size;
      canvas.height = size;

      // Dibujar un círculo
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Dibujar la imagen dentro del círculo
      ctx.drawImage(img, 0, 0, size, size);

      // Convertir canvas a Base64
      resolve(canvas.toDataURL("image/png"));
    };
  });
};
  

  return (
    <div className="tabla-container-table">
      <h2>Lista de Eventos</h2>

      {/* Barra de filtros */}
      <div className="filtro-container-table">
        <select
          className="filtro-select-table"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setBusqueda(''); // Reiniciar búsqueda al cambiar filtro
          }}
        >
          <option value="">Seleccionar filtro</option>
          <option value="fecha">Fecha</option>
          <option value="id">ID</option>
          <option value="lugar">Lugar</option>
          <option value="nombre">Nombre</option>
        </select>

        {filtro === 'fecha' && (
          <input
            type="date"
            className="filtro-input-table"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        )}

        {filtro === 'id' && (
          <select
            className="filtro-input-table"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          >
            <option value="">Seleccionar ID</option>
            {idsDisponibles.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        )}

        {filtro === 'lugar' && (
          <select
            className="filtro-input-table"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          >
            <option value="">Seleccionar Lugar</option>
            {lugaresDisponibles.map((lugar) => (
              <option key={lugar} value={lugar}>
                {lugar}
              </option>
            ))}
          </select>
        )}

        {filtro === 'nombre' && (
          <input
            type="text"
            className="filtro-input-table"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        )}

        <button className="buscar-btn-table" onClick={handleSearch}>
          Buscar
        </button>
        <button className="buscar-btn-table" onClick={handleVerTodos}>
          Ver Todos
        </button>
      </div>

      <table className="tabla-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Fecha Inicio</th>
      <th>Fecha Fin</th>
      <th>Imagen</th>
      <th>Evento Activo</th>
      <th>Evento Vendido</th>
      <th>ID del Lugar</th>
      <th>Actualizar</th>
      <th>Eliminar</th>
      <th>Imprimir Informe</th> {/* Nueva columna */}
    </tr>
  </thead>
  <tbody>
    {datosFiltrados.map((evento) => (
      <tr key={evento.id}>
        <td>{evento.id}</td>
        <td>{evento.nombre}</td>
        <td>{evento.fecha_inicio}</td>
        <td>{evento.fecha_fin}</td>
        <td>
          <img
            src={`http://localhost:4000${evento.imagen_principal}`}
            alt={evento.nombre}
            width="50"
          />
        </td>
        <td>{evento.activo ? 'Sí' : 'No'}</td>
        <td>{evento.vendido ? 'Sí' : 'No'}</td>
        <td>{evento.id_lugar}</td>
        <td>
          <button
            className="icon-btn-table actualizar-btn-table"
            onClick={(e) => handleOpenUpdateModal(evento, e)} // Pasa el evento click
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </td>
        <td>
          <button
            className="icon-btn-table eliminar-btn-table"
            onClick={() => eliminarEvento(evento.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
        <td>
          {/* Botón para imprimir informe */}
          <button
            className="icon-btn-table imprimir-btn-table"
            onClick={() => imprimirInforme(evento)}
          >
             <FontAwesomeIcon icon={faPrint} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      <AnimatePresence>
        {showUpdateModal && (
          <motion.div
            style={{ position: 'absolute', top: `${modalPosition.top+200}px`}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UpdateEventModal
              evento={selectedEvento}
              onClose={handleCloseUpdateModal}
              onAdd={handleUpdateEvento}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Table;
