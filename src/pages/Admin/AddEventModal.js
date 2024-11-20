import React, { useState } from 'react';
import axios from 'axios'; // Importar Axios
import './AddEventModal.css';

const AddEventModal = ({ onClose, onAdd }) => {
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    imagen: null,
    idLugar: '',
    activo: '',
    vendido: '',
    numEntradas: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoEvento((prev) => ({ ...prev, imagen: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setNuevoEvento((prev) => ({ ...prev, imagen: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (
      !nuevoEvento.nombre ||
      !nuevoEvento.descripcion ||
      !nuevoEvento.fechaInicio ||
      !nuevoEvento.fechaFin ||
      !nuevoEvento.idLugar ||
      !nuevoEvento.activo ||
      !nuevoEvento.vendido ||
      !nuevoEvento.numEntradas
    ) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }
  
    // Crear el objeto con los datos mapeados para el backend
    const payload = {
      nombre: nuevoEvento.nombre,
      descripcion: nuevoEvento.descripcion,
      fecha_inicio: nuevoEvento.fechaInicio,
      fecha_fin: nuevoEvento.fechaFin,
      imagen_principal: nuevoEvento.imagen
        ? "https://acortar.link/e3yt8u" // URL fija como ejemplo
        : null, // O manejar de forma dinámica
      categoria: "Conferencia", // Valor fijo o dinámico si tienes el campo
      vendido: nuevoEvento.vendido === "si",
      activo: nuevoEvento.activo === "si",
      id_lugar: parseInt(nuevoEvento.idLugar),
      id_creador: 1, // Valor fijo como ejemplo; ajusta según tu lógica
    };
  
    // Mostrar los datos que se enviarán al backend
    console.log("Datos a enviar al backend:", payload);
  
    try {
      const response = await axios.post("http://localhost:4000/evento/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      onAdd(response.data); // Llama a la función onAdd con los datos del evento
      onClose(); // Cierra el modal
    } catch (error) {
      setError(error.response?.data?.error || "Error al agregar el evento");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="modal-overlay-add">
      <div className="modal-content-add">
        <p className="modal-title-add">Agregar Evento</p>
        <form onSubmit={handleSubmit} className="form-add">
          {/* Campos del formulario */}
          <div className="user-box-add">
            <input
              type="text"
              name="nombre"
              value={nuevoEvento.nombre}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Nombre</label>
          </div>
          <div className="user-box-add">
            <input
              type="text"
              name="descripcion"
              value={nuevoEvento.descripcion}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Descripción</label>
          </div>

          <div className="user-box-add">
            <input
              type="datetime-local"
              name="fechaInicio"
              value={nuevoEvento.fechaInicio}
              onChange={handleChange}
              required
            />
            <label>Fecha de Inicio</label>
          </div>

          <div className="user-box-add">
            <input
              type="datetime-local"
              name="fechaFin"
              value={nuevoEvento.fechaFin}
              onChange={handleChange}
              required
            />
            <label>Fecha de Fin</label>
          </div>

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

          <div className="user-box-add">
            <select
              name="activo"
              value={nuevoEvento.activo}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Evento Activo</label>
          </div>

          <div className="user-box-add">
            <select
              name="vendido"
              value={nuevoEvento.vendido}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Evento Vendido</label>
          </div>

          <div className="user-box-add">
            <select
              name="idLugar"
              value={nuevoEvento.idLugar}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="1">Lugar 1</option>
              <option value="2">Lugar 2</option>
            </select>
            <label>ID del Lugar</label>
          </div>

          {/* Nuevo campo: Número de Entradas */}
          <div className="user-box-add">
            <input
              type="number"
              name="numEntradas"
              value={nuevoEvento.numEntradas}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Número de Entradas</label>
          </div>

          {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
          
          <div className="modal-footer-add">
            <button type="button" onClick={onClose} className="cancel-btn-add">
              Cancelar
            </button>
            <button type="submit" className="submit-btn-add" disabled={loading}>
              {loading ? 'Cargando...' : 'Agregar Evento'}
            </button>
          </div>
        </form>
        {error && <p className="error-message-add">{error}</p>}
      </div>
    </div>
  );
};

export default AddEventModal;
