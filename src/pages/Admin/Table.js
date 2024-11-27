import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import UpdateEventModal from './UpdateEventModal';
import './Table.css';

const Table = () => {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState(''); // Tipo de filtro
  const [busqueda, setBusqueda] = useState(''); // Término de búsqueda
  const [datosFiltrados, setDatosFiltrados] = useState([]); // Datos filtrados para mostrar en la tabla
  const [selectedEvento, setSelectedEvento] = useState(null); // Evento seleccionado para actualizar
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Controlar la visibilidad del modal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Posición del modal

  // Cargar los datos desde la API al montar el componente
  useEffect(() => {
    fetch('https://eventpro-b.onrender.com/evento')
      .then((response) => response.json())
      .then((data) => {
        setDatos(data.data);
        setDatosFiltrados(data.data); // Inicializar datosFiltrados con todos los eventos
      })
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  const idsDisponibles = [...new Set(datos.map((evento) => evento.id))];
  const lugaresDisponibles = [...new Set(datos.map((evento) => evento.id_lugar))];

  const eliminarEvento = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        const response = await fetch(`https://eventpro-b.onrender.com/evento/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setDatos((prevDatos) => prevDatos.filter((evento) => evento.id !== id));
          setDatosFiltrados((prevDatos) =>
            prevDatos.filter((evento) => evento.id !== id)
          );
          alert('Evento eliminado correctamente.');
        } else {
          const errorData = await response.json();
          alert(`Error al eliminar el evento: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        alert('Hubo un problema al intentar eliminar el evento.');
      }
    }
  };

  const handleOpenUpdateModal = (evento, event) => {
    // Obtener la posición del botón de actualización
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.top - 150, left: rect.left }); // Ajusta el top según lo necesites

    setSelectedEvento(evento);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedEvento(null);
  };

  const handleUpdateEvento = (eventoActualizado) => {
    setDatos(
      datos.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    );
    setDatosFiltrados(
      datosFiltrados.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    );
    handleCloseUpdateModal();
  };

  const handleSearch = () => {
    if (filtro === 'fecha') {
      const filtrados = datos.filter((evento) =>
        evento.fecha_inicio.includes(busqueda)
      );
      setDatosFiltrados(filtrados);
    } else if (filtro === 'id') {
      const filtrados = datos.filter(
        (evento) => evento.id.toString() === busqueda
      );
      setDatosFiltrados(filtrados);
    } else if (filtro === 'lugar') {
      const filtrados = datos.filter(
        (evento) => evento.id_lugar.toString() === busqueda
      );
      setDatosFiltrados(filtrados);
    } else if (filtro === 'nombre') {
      const filtrados = datos.filter((evento) =>
        evento.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setDatosFiltrados(filtrados);
    } else {
      setDatosFiltrados(datos); // Restablecer si no hay filtro válido
    }
  };

  const handleVerTodos = () => {
    setFiltro('');
    setBusqueda('');
    setDatosFiltrados(datos); // Restablecer los datos filtrados
  };

  return (
    <div className="tabla-container-table">
      <h2>Lista de Eventos</h2>

      {/* Barra de filtros */}
      <div className="filtro-container-table">
        <select
          className="filtro-select-table"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setBusqueda(''); // Reiniciar búsqueda al cambiar filtro
          }}
        >
          <option value="">Seleccionar filtro</option>
          <option value="fecha">Fecha</option>
          <option value="id">ID</option>
          <option value="lugar">Lugar</option>
          <option value="nombre">Nombre</option>
        </select>

        {filtro === 'fecha' && (
          <input
            type="date"
            className="filtro-input-table"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        )}

        {filtro === 'id' && (
          <select
            className="filtro-input-table"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          >
            <option value="">Seleccionar ID</option>
            {idsDisponibles.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        )}

        {filtro === 'lugar' && (
          <select
            className="filtro-input-table"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          >
            <option value="">Seleccionar Lugar</option>
            {lugaresDisponibles.map((lugar) => (
              <option key={lugar} value={lugar}>
                {lugar}
              </option>
            ))}
          </select>
        )}

        {filtro === 'nombre' && (
          <input
            type="text"
            className="filtro-input-table"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        )}

        <button className="buscar-btn-table" onClick={handleSearch}>
          Buscar
        </button>
        <button className="buscar-btn-table" onClick={handleVerTodos}>
          Ver Todos
        </button>
      </div>

      <table className="tabla-table">
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
          {datosFiltrados.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.nombre}</td>
              <td>{evento.descripcion}</td>
              <td>{evento.fecha_inicio}</td>
              <td>{evento.fecha_fin}</td>
              <td>
                <img
                  src={`https://eventpro-b.onrender.com${evento.imagen_principal}`}
                  alt={evento.nombre}
                  width="50"
                />
              </td>
              <td>{evento.activo ? 'Sí' : 'No'}</td>
              <td>{evento.vendido ? 'Sí' : 'No'}</td>
              <td>{evento.id_lugar}</td>
              <td>
                <button
                  className="icon-btn-table actualizar-btn-table"
                  onClick={(e) => handleOpenUpdateModal(evento, e)} // Pasa el evento click
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button
                  className="icon-btn-table eliminar-btn-table"
                  onClick={() => eliminarEvento(evento.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showUpdateModal && (
          <motion.div
            style={{ position: 'absolute', top: `${modalPosition.top+200}px`}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UpdateEventModal
              evento={selectedEvento}
              onClose={handleCloseUpdateModal}
              onAdd={handleUpdateEvento}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Table;
