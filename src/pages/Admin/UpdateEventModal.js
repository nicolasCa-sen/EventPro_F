import React, { useState, useEffect } from 'react';
import './UpdateEventModal.css';

const UpdateEventModal = ({ evento, onClose, onAdd }) => {
  const [eventoActualizado, setEventoActualizado] = useState(evento);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (evento) {
      setEventoActualizado(evento);
      if (evento.imagen) {
        setPreviewImage(evento.imagen); // Si ya hay una imagen, mostrarla en la vista previa
      }
    }
  }, [evento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoActualizado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Mostrar la vista previa de la imagen
      setEventoActualizado((prev) => ({
        ...prev,
        imagen: file.name, // Solo guardar el nombre del archivo
      }));
    }
  };

  // Maneja el evento de arrastre
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Mostrar la vista previa de la imagen
      setEventoActualizado((prev) => ({
        ...prev,
        imagen: file.name, // Solo guardar el nombre del archivo
      }));
    }
  };

  // Permite el arrastre de archivos sobre el área
  const handleDragOver = (e) => {
    e.preventDefault(); // Esto evita que el navegador intente abrir el archivo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(eventoActualizado); // Pasa el evento actualizado al padre
    onClose(); // Cierra el modal
  };

  return (
    <div className="modal-overlay-update">
      <div className="modal-content-update">
        <p>Actualizar Evento</p>
        <form onSubmit={handleSubmit}>
          {/* Campo de Nombre */}
          <div className="user-box-update">
            <input
              type="text"
              name="nombre"
              value={eventoActualizado.nombre || ''}
              onChange={handleChange}
              required
            />
            <label>Nombre</label>
          </div>

          {/* Campo de Descripción */}
          <div className="user-box-update">
            <input
              type="text"
              name="descripcion"
              value={eventoActualizado.descripcion || ''}
              onChange={handleChange}
              required
            />
            <label>Descripción</label>
          </div>

          {/* Campo de Fecha de Inicio */}
          <div className="user-box-update">
            <input
              type="datetime-local"
              name="fecha_inicio"
              value={eventoActualizado.fecha_inicio ? eventoActualizado.fecha_inicio.slice(0, 16) : ''}
              onChange={handleChange}
              required
            />
            <label>Fecha de Inicio</label>
          </div>

          {/* Campo de Fecha de Fin */}
          <div className="user-box-update">
            <input
              type="datetime-local"
              name="fecha_fin"
              value={eventoActualizado.fecha_fin ? eventoActualizado.fecha_fin.slice(0, 16) : ''}
              onChange={handleChange}
              required
            />
            <label>Fecha de Fin</label>
          </div>

          {/* Campo de Imagen con arrastre o selección */}
          <div
            className="image-upload-box-add"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Selecciona o arrastra una imagen aquí</p>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input-add"
            />
            {previewImage && (
              <div className="image-preview-add">
                <img src={previewImage} alt="Vista previa" />
              </div>
            )}
          </div>

          {/* Campo de Evento Activo */}
          <div className="user-box-update">
            <select
              name="activo"
              value={eventoActualizado.activo || ''}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Evento Activo</label>
          </div>

          {/* Campo de Evento Vendido */}
          <div className="user-box-update">
            <select
              name="vendido"
              value={eventoActualizado.vendido || ''}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Evento Vendido</label>
          </div>

          {/* Campo de ID del Lugar */}
          <div className="user-box-update">
            <select
              name="id_lugar"
              value={eventoActualizado.id_lugar || ''}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="1">Lugar 1</option>
              <option value="2">Lugar 2</option>
            </select>
            <label>ID del Lugar</label>
          </div>

          {/* Botones de acción */}
          <div className="button-group-update">
            <button type="submit" className="submit-btn-update">Actualizar</button>
            <button type="button" className="close-btn-update" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;
