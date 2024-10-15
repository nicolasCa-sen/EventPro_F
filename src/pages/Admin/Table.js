import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import UpdateEventModal from './UpdateEventModal';
import './Table.css';

const Table = () => {
  const [datos, setDatos] = useState([
    {
      id: 1,
      nombre: 'Evento 1',
      descripcion: 'Descripción del Evento 1',
      fechaInicio: '2024-10-20',
      fechaFin: '2024-10-22',
      imagen: 'https://via.placeholder.com/100',
      activo: 'Sí',
      vendido: 'No',
      idLugar: 1,
    },
    {
      id: 2,
      nombre: 'Evento 2',
      descripcion: 'Descripción del Evento 2',
      fechaInicio: '2024-11-01',
      fechaFin: '2024-11-05',
      imagen: 'https://via.placeholder.com/100',
      activo: 'Sí',
      vendido: 'No',
      idLugar: 2,
    },
  ]);

  const [selectedEvento, setSelectedEvento] = useState(null); // Guardar el evento seleccionado
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Controlar la visibilidad del modal

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
              <td>{evento.fechaInicio}</td>
              <td>{evento.fechaFin}</td>
              <td>
                <img src={evento.imagen} alt={evento.nombre} width="50" />
              </td>
              <td>{evento.activo}</td>
              <td>{evento.vendido}</td>
              <td>{evento.idLugar}</td>
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
