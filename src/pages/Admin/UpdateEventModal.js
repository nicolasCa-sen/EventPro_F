import React, { useState, useEffect } from 'react';
import './UpdateEventModal.css';

const UpdateEventModal = ({ evento, onClose, onAdd }) => {
  const [eventoActualizado, setEventoActualizado] = useState(evento);

  // Cada vez que cambie el evento seleccionado, actualiza el estado del modal
  useEffect(() => {
    setEventoActualizado(evento);
  }, [evento]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoActualizado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envía los datos actualizados
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(eventoActualizado); // Envía el evento actualizado al componente padre
    onClose(); // Cierra el modal
  };

  return (
    
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Actualizar Evento</p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="nombre"
              value={eventoActualizado.nombre || ''}
              onChange={handleChange}
              required
            />
            <label>Nombre</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="descripcion"
              value={eventoActualizado.descripcion || ''}
              onChange={handleChange}
              required
            />
            <label>Descripción</label>
          </div>

          <div className="user-box">
            <input
              type="datetime-local"
              name="fechaInicio"
              value={eventoActualizado.fechaInicio || ''}
              onChange={handleChange}
              required
            />
            <label>Fecha de Inicio</label>
          </div>

          <div className="user-box">
            <input
              type="datetime-local"
              name="fechaFin"
              value={eventoActualizado.fechaFin || ''}
              onChange={handleChange}
              required
            />
            <label>Fecha de Fin</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="imagen"
              value={eventoActualizado.imagen || ''}
              onChange={handleChange}
              required
            />
            <label>Imagen</label>
          </div>

          <div className="user-box">
            <select
              name="activo"
              value={eventoActualizado.activo || ''}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Evento Activo</label>
          </div>

          <div className="user-box">
            <select
              name="vendido"
              value={eventoActualizado.vendido || ''}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Evento Vendido</label>
          </div>

          <div className="user-box">
            <select
              name="idLugar"
              value={eventoActualizado.idLugar || ''}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="1">Lugar 1</option>
              <option value="2">Lugar 2</option>
            </select>
            <label>ID del Lugar</label>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">Actualizar</button>
            <button type="button" className="close-btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;