import React, { useState } from 'react';
import './AddEventModal.css'; // Asegúrate de tener estilos para el modal

const AddEventModal = ({ onClose, onAdd }) => {
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    imagen: '',
    idLugar: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar el nuevo evento (puedes ajustar el ID según lo necesites)
    const eventoConId = {
      ...nuevoEvento,
      id: Math.floor(Math.random() * 10000), // Genera un ID aleatorio (cámbialo por una lógica de ID adecuada)
    };
    onAdd(eventoConId);
    onClose(); // Cierra el modal después de agregar el evento
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Agregar Evento</p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="nombre"
              placeholder=" "
              required
            />
            <label>Nombre</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="descripcion"
              placeholder=" "
              required
            />
            <label>Descripción</label>
          </div>

          <div className="user-box">
            <input
              type="datetime-local"
              name="fechaInicio"
              required
            />
            <label>Fecha de Inicio</label>
          </div>

          <div className="user-box">
            <input
              type="datetime-local"
              name="fechaFin"
              required
            />
            <label>Fecha de Fin</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="imagen"
              placeholder=" "
              required
            />
            <label>Imagen</label>
          </div>
          <div className="user-box">
          <select
          name="activo"
          placeholder=" "
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
          placeholder=" "
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
          placeholder=" "
          required
          >
          <option value="">Seleccionar...</option>
          <option value="1">2</option>
          <option value="2">1</option>
          </select>
          <label>ID del Lugar</label>
          </div>

  <div >
    <a onClick={handleSubmit}>     
       <span></span>
      <span></span>
      <span></span>
      <span></span>
      Agregar</a>
    <a  type="button" onClick={onClose}>
    <span></span>
      <span></span>
      <span></span>
      <span></span>
      Cerrar</a>
  </div>
</form>


      </div>
    </div>
  );
};

export default AddEventModal;
