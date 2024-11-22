import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import UpdateEventModal from './UpdateEventModal';
import './Table.css';

const Table = () => {
  const [datos, setDatos] = useState([]);
  const [selectedEvento, setSelectedEvento] = useState(null); // Guardar el evento seleccionado
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Controlar la visibilidad del modal

  // Cargar los datos desde la API al montar el componente
  useEffect(() => {
    fetch('http://localhost:4000/evento')
      .then((response) => response.json()) // Convertir la respuesta a formato JSON
      .then((data) => setDatos(data.data)) // Acceder a la propiedad "data" que contiene los eventos
      .catch((error) => console.error('Error al cargar los datos:', error)); // Manejo de errores
  }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

  const eliminarEvento = (id) => {
    setDatos(datos.filter((evento) => evento.id !== id));
  };

  const handleOpenUpdateModal = (evento) => {
    setSelectedEvento(evento);
    setShowUpdateModal(true); // Mostrar el modal
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); // Ocultar el modal
    setSelectedEvento(null);
  };

  const handleUpdateEvento = (eventoActualizado) => {
    setDatos(
      datos.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    );
    handleCloseUpdateModal();
  };

  return (
    <div className="tabla-container">
      <h2>Lista de Eventos</h2>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Imagen</th>
            <th>Evento Activo</th>
            <th>Evento Vendido</th>
            <th>ID del Lugar</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.nombre}</td>
              <td>{evento.descripcion}</td>
              <td>{evento.fecha_inicio}</td>
              <td>{evento.fecha_fin}</td>
              <td>
              <td>
  <img 
    src={`http://localhost:4000${evento.imagen_principal}`} 
    alt={evento.nombre} 
    width="50" 
  />
</td>

              </td>
              <td>{evento.activo ? 'Sí' : 'No'}</td>
              <td>{evento.vendido ? 'Sí' : 'No'}</td>
              <td>{evento.id_lugar}</td>
              <td>
                <button
                  className="icon-btn actualizar-btn"
                  onClick={() => handleOpenUpdateModal(evento)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button
                  className="icon-btn eliminar-btn"
                  onClick={() => eliminarEvento(evento.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showUpdateModal && (
          <motion.div
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
