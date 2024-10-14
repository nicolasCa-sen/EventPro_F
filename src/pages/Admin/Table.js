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
      activo:'Sí',
      vendido:'No',
      idLugar: 1
        },
    {
      id: 2,
      nombre: 'Evento 2',
      descripcion: 'Descripción del Evento 2',
      fechaInicio: '2024-11-01',
      fechaFin: '2024-11-05',
      imagen: 'https://via.placeholder.com/100',
      activo:'Sí',
      vendido:'No',
      idLugar: 2,
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
                  <button
                    className="card-button-close"
                    onClick={() => setSelectedId(null)}
                  >
                    ✘
                  </button>
                 
                  <p className='principio'>Actualizar Evento</p>
                  
        <form >
        <div className="user-box">
            <input
              type="text"
              name="nombre"
              value={evento.id}
              disabled
            />
            <label>Nombre</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="nombre"
              placeholder=" "
              value={evento.nombre}
              required
            />
            <label>Nombre</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="descripcion"
              placeholder=" "
              value={evento.descripcion}
              required
            />
            <label>Descripción</label>
          </div>

          <div className="user-box">
            <input
              type="date"
              name="fechaInicio"
              value={evento.fechaInicio}
              required
            />
            <label>Fecha de Inicio</label>
          </div>

          <div className="user-box">
            <input
              type="date"
              name="fechaFin"
              value={evento.fechaFin}
              required
            />
            <label>Fecha de Fin</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="imagen"
              placeholder=" "
              value={evento.imagen}
              required
            />
            <label>Imagen</label>
          </div>
          <div className='user-box'>
          <select
          name="activo"
          placeholder=" "
          value={evento.activo}
          required
          >
          <option value="">Seleccionar...</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
          </select>
          <label>Evento Activo</label>
          </div>
          <div className="user-box">
          <select
          name="vendido"
          placeholder=" "
          value={evento.vendido}
          required
          >
          <option value="">Seleccionar...</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
          </select>
          <label>Evento Vendido</label>
          </div>
          <div className="user-box">
          <select
          name="idLugar"
          placeholder=" "
          value={evento.idLugar}
          required
          >
          <option value="">Seleccionar...</option>
          <option value="1">2</option>
          <option value="2">1</option>
          </select>
          <label>ID del Lugar</label>
          </div>

  <div >
    <a >     
       <span></span>
      <span></span>
      <span></span>
      <span></span>
      Actualizar</a>
  </div>
  </form>
                  
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
