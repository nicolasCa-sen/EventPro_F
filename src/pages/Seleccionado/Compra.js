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
    activo: 'si', // Valor por defecto
    vendido: 'no', // Valor por defecto
    numEntradas: '',
    valorBoleta: '', // Nuevo campo para el valor de la boleta
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calcular el precio total
  const calcularPrecioTotal = () => {
    return nuevoEvento.numEntradas && nuevoEvento.valorBoleta
      ? nuevoEvento.numEntradas * nuevoEvento.valorBoleta
      : 0;
  };

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

    const now = new Date(); // Fecha y hora actual
    const fechaInicio = new Date(nuevoEvento.fechaInicio);
    const fechaFin = new Date(nuevoEvento.fechaFin);

    // Validar que todos los campos obligatorios estén completos
    if (
      !nuevoEvento.nombre ||
      !nuevoEvento.descripcion ||
      !nuevoEvento.fechaInicio ||
      !nuevoEvento.fechaFin ||
      !nuevoEvento.idLugar ||
      !nuevoEvento.numEntradas ||
      !nuevoEvento.imagen ||
      !nuevoEvento.valorBoleta // Validación del nuevo campo
    ) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    // Validar que la fecha de inicio no sea menor a la fecha actual
    if (fechaInicio < now) {
      setError("La fecha de inicio no puede ser menor a la fecha y hora actual.");
      setLoading(false);
      return;
    }

    // Validar que la fecha de fin no sea menor a la fecha de inicio
    if (fechaFin <= fechaInicio) {
      setError("La fecha de fin no puede ser menor o igual a la fecha de inicio.");
      setLoading(false);
      return;
    }

    const payload = new FormData();

    payload.append("nombre", nuevoEvento.nombre);
    payload.append("descripcion", nuevoEvento.descripcion);
    payload.append("fecha_inicio", nuevoEvento.fechaInicio);
    payload.append("fecha_fin", nuevoEvento.fechaFin);
    payload.append("imagen_principal", nuevoEvento.imagen);
    payload.append("categoria", "Conferencia");
    payload.append("vendido", nuevoEvento.vendido === "si");
    payload.append("activo", nuevoEvento.activo === "si");
    payload.append("id_lugar", parseInt(nuevoEvento.idLugar));
    payload.append("id_creador", 1);
    payload.append("valor_boleta", nuevoEvento.valorBoleta); // Agregar el valor de la boleta al payload

    try {
      const response = await axios.post("https://eventpro-b.onrender.com/evento/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error(error);
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
              min={new Date().toISOString().slice(0, 16)} // Establece la fecha mínima
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
              min={nuevoEvento.fechaInicio || new Date().toISOString().slice(0, 16)} // Depende de la fecha de inicio
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

          {/* Nuevo campo: Valor de la Boleta */}
          <div className="user-box-add">
            <input
              type="number"
              name="valorBoleta"
              value={nuevoEvento.valorBoleta}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Valor de la Boleta</label>
          </div>

          {/* Mostrar el precio total */}
          <div className="precio-total">
            <p><strong>Precio Total: </strong>${calcularPrecioTotal()}</p>
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
