import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
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
      idLugar: 101,
      idOrganizacion: 201,
    },
    {
      id: 2,
      nombre: 'Evento 2',
      descripcion: 'Descripción del Evento 2',
      fechaInicio: '2024-11-01',
      fechaFin: '2024-11-05',
      imagen: 'https://via.placeholder.com/100',
      idLugar: 102,
      idOrganizacion: 202,
    },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  const eliminarEvento = (id) => {
    setDatos(datos.filter((evento) => evento.id !== id));
  };

  const actualizarEvento = (id) => {
    setSelectedId(id);
  };

  const agregarEvento = (nuevoEvento) => {
    setDatos([...datos, nuevoEvento]);
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
            <th>ID del Lugar</th>
            <th>ID de la Organización</th>
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
              <td>{evento.idLugar}</td>
              <td>{evento.idOrganizacion}</td>
              <td>
                <center>
                  <button
                    className="icon-btn actualizar-btn"
                    onClick={() => actualizarEvento(evento.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </center>
              </td>
              <td>
                <center>
                  <button
                    className="icon-btn eliminar-btn"
                    onClick={() => eliminarEvento(evento.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar detalles del evento seleccionado con AnimatePresence */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="card-expanded"
            onClick={() => setSelectedId(null)} // Cerrar al hacer clic en el fondo
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {datos.map((evento) =>
              evento.id === selectedId ? (
                <motion.div key={evento.id} className="card-content">
                  <h5 className="card-subtitle">{evento.descripcion}</h5>
                  <h2 className="card-title">{evento.nombre}</h2>
                  <h5 className="card-subtitle">Desde: {evento.fechaInicio}</h5>
                  <h5 className="card-subtitle">Hasta: {evento.fechaFin}</h5>
                  {/* INGRITH LO TUYO DE ACTUALIZAR VA AQUI */}
                  <button
                    className="card-button-close"
                    onClick={() => setSelectedId(null)}
                  >
                    ✘
                  </button>
                </motion.div>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default Table;
