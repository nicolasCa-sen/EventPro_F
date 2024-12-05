import React, { useState, useEffect } from 'react';
import './UpdateEventModal.css';

const UpdateEventModal = ({ evento, onClose, onAdd }) => {
  const [eventoActualizado, setEventoActualizado] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null); // Archivo de imagen seleccionado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (evento) {
      setEventoActualizado(evento);
      setPreviewImage(`http://localhost:4000${evento.imagen_principal}`);
    }
  }, [evento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoActualizado((prev) => ({
      ...prev,
      [name]: name === 'activo' || name === 'vendido' ? value === 'true' : value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile)); // Mostrar vista previa
      setFile(selectedFile); // Guardar el archivo para enviarlo al backend
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!eventoActualizado.nombre || !eventoActualizado.descripcion || !eventoActualizado.id_lugar) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setIsLoading(true); // Mostrar indicador de carga
    setError(null); // Limpiar errores previos

    // Crear FormData para manejar la imagen y otros datos
    const formData = new FormData();
    Object.entries(eventoActualizado).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append('imagen_principal', file); // Agregar la imagen al FormData
    }

    try {
      const response = await fetch(`http://localhost:4000/evento/${eventoActualizado.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        onAdd(updatedEvent.data); // Pasar el evento actualizado al padre
        onClose(); // Cerrar el modal
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'Error al actualizar el evento');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('Ocurrió un error al intentar actualizar el evento.');
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <div className="modal-overlay-update">
      <div className="modal-content-update">
        <p>Actualizar Evento</p>
        {error && <p className="error-message">{error}</p>} {/* Mostrar error */}
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
              value={eventoActualizado.fecha_inicio?.slice(0, 16) || ''}
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
              value={eventoActualizado.fecha_fin?.slice(0, 16) || ''}
              onChange={handleChange}
              required
            />
            <label>Fecha de Fin</label>
          </div>

          {/* Campo de Imagen */}
          <div className="image-upload-box-add">
            <p>Selecciona o arrastra una imagen aquí</p>
            <input
              type="file"
              name="imagen_principal"
              accept="image/*"
              onChange={handleImageChange}
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
              value={eventoActualizado.activo ? 'true' : 'false'}
              onChange={handleChange}
              required
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <label>Evento Activo</label>
          </div>

          {/* Campo de Evento Vendido */}
          <div className="user-box-update">
            <select
              name="vendido"
              value={eventoActualizado.vendido ? 'true' : 'false'}
              onChange={handleChange}
              required
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <label>Evento Vendido</label>
          </div>

          {/* Campo de ID del Lugar */}
          <div className="user-box-update">
            <input
              type="text"
              name="id_lugar"
              value={eventoActualizado.id_lugar || ''}
              onChange={handleChange}
              required
            />
            <label>ID del Lugar</label>
          </div>

          {/* Botones de acción */}
          <div className="button-group-update">
            <button type="submit" className="submit-btn-update" disabled={isLoading}>
              {isLoading ? 'Actualizando...' : 'Actualizar'}
            </button>
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
