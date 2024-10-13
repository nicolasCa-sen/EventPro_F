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
    idOrganizacion: '',
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
       <form>

        {/**INGRITH LO DE AGREGAR EVENTO VA AQUI */}
          <button type="submit">Agregar Evento</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
