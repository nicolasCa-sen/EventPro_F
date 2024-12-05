import React, { useState } from 'react';
import axios from 'axios';
import './AddEventModal.css';

const AddEventModal = ({ onClose, onAdd, currentUserId }) => {
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    imagen: null,
    idLugar: '',
    categoria: '',
    activo: 'si', // Por defecto
    vendido: 'no', // Por defecto
    numEntradas: '',
    valorBoleta: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const now = new Date();
    const fechaInicio = new Date(nuevoEvento.fechaInicio);
    const fechaFin = new Date(nuevoEvento.fechaFin);

    // Validaciones básicas
    if (
      !nuevoEvento.nombre ||
      !nuevoEvento.descripcion ||
      !nuevoEvento.fechaInicio ||
      !nuevoEvento.fechaFin ||
      !nuevoEvento.idLugar ||
      !nuevoEvento.numEntradas ||
      !nuevoEvento.imagen ||
      !nuevoEvento.valorBoleta ||
      !nuevoEvento.categoria
    ) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    // Validar fechas
    if (fechaInicio < now) {
      setError('La fecha de inicio no puede ser menor a la actual.');
      setLoading(false);
      return;
    }

    if (fechaFin <= fechaInicio) {
      setError('La fecha de fin no puede ser menor o igual a la fecha de inicio.');
      setLoading(false);
      return;
    }

    // Validar cantidad de entradas y valor de boleta
    const cantidadEntradas = parseInt(nuevoEvento.numEntradas, 10);
    const valorBoleta = parseFloat(nuevoEvento.valorBoleta);

    if (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
      setError('El número de entradas debe ser un valor positivo.');
      setLoading(false);
      return;
    }

    if (isNaN(valorBoleta) || valorBoleta <= 0) {
      setError('El valor de la boleta debe ser un valor positivo.');
      setLoading(false);
      return;
    }

    // Preparar datos para el backend
    const payload = new FormData();
    payload.append('nombre', nuevoEvento.nombre);
    payload.append('descripcion', nuevoEvento.descripcion);
    payload.append('fecha_inicio', nuevoEvento.fechaInicio);
    payload.append('fecha_fin', nuevoEvento.fechaFin);
    payload.append('imagen_principal', nuevoEvento.imagen);
    payload.append('id_lugar', parseInt(nuevoEvento.idLugar));
    payload.append('id_creador', 5); // ID dinámico del creador
    payload.append('activo', nuevoEvento.activo === 'si');
    payload.append('vendido', nuevoEvento.vendido === 'si');
    payload.append('categoria', nuevoEvento.categoria);
    payload.append('num_entradas', nuevoEvento.numEntradas);
    payload.append('valor_boleta', nuevoEvento.valorBoleta);

    try {
      // Enviar los datos al backend con cantidadEntradas y valorBoleta en la URL
      const response = await axios.post(
        `http://localhost:4000/evento/${nuevoEvento.numEntradas}/${nuevoEvento.valorBoleta}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      onAdd(response.data); // Notificar al componente padre
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error al agregar el evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay-add">
      <div className="modal-content-add">
        <p className="modal-title-add">Agregar Evento</p>
        <form onSubmit={handleSubmit} className="form-add">
          {/* Nombre */}
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

          {/* Descripción */}
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

          {/* Fecha de Inicio */}
          <div className="user-box-add">
            <input
              type="datetime-local"
              name="fechaInicio"
              value={nuevoEvento.fechaInicio}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
            <label>Fecha de Inicio</label>
          </div>

          {/* Fecha de Fin */}
          <div className="user-box-add">
            <input
              type="datetime-local"
              name="fechaFin"
              value={nuevoEvento.fechaFin}
              onChange={handleChange}
              min={nuevoEvento.fechaInicio || new Date().toISOString().slice(0, 16)}
              required
            />
            <label>Fecha de Fin</label>
          </div>

          {/* Imagen */}
          <div className="image-upload-box-add">
            <p>Selecciona o arrastra una imagen aquí</p>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input-add"
              required
            />
            {previewImage && (
              <div className="image-preview-add">
                <img src={previewImage} alt="Vista previa" />
              </div>
            )}
          </div>

          {/* ID Lugar */}
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

          {/* Categoría */}
          <div className="user-box-add">
            <input
              type="text"
              name="categoria"
              value={nuevoEvento.categoria}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Categoría</label>
          </div>

          {/* Número de Entradas */}
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

          {/* Valor de la Boleta */}
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

          {/* Error */}
          {error && <p className="error-message">{error}</p>}

          {/* Botones */}
          <div className="modal-footer-add">
            <button type="button" onClick={onClose} className="cancel-btn-add">
              Cancelar
            </button>
            <button type="submit" className="submit-btn-add" disabled={loading}>
              {loading ? 'Cargando...' : 'Agregar Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
