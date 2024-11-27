import './Admin.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../Images/admin.png';
import Tabla from './Table'; // Asumiendo que esta tabla maneja los eventos
import TableUsers from './TableUsers'; // Importar la tabla de usuarios
import AddEventModal from './AddEventModal'; // Modal para agregar eventos
import UpdateEventModal from './UpdateEventModal'; // Modal para actualizar eventos
import { useAuth } from '../../context/AuthContext'; // Contexto de autenticación

function Admin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalActualizarAbierto, setModalActualizarAbierto] = useState(false);
  const [eventoActual, setEventoActual] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [eventos, setEventos] = useState([]);
  const [vistaSeleccionada, setVistaSeleccionada] = useState('eventos'); // Estado para manejar la vista activa
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const manejarAgregarEvento = (nuevoEvento) => {
    setEventos((prevEventos) => [...prevEventos, nuevoEvento]);
    setModalAbierto(false);
  };

  const manejarActualizarEvento = (eventoActualizado) => {
    setEventos((prevEventos) =>
      prevEventos.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    );
    setModalActualizarAbierto(false);
  };

  const abrirModalActualizar = (evento) => {
    setEventoActual(evento);
    setModalActualizarAbierto(true);
  };

  const handleSearch = async () => {
    const query = busqueda.trim(); // Usa 'busqueda' del estado
    if (!query) {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }

    try {
      const response = await fetch(
        `https://eventpro-b.onrender.com/eventos/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.data.length > 0) {
          setEventos(data.data); // Actualiza la tabla con los eventos encontrados
        } else {
          alert('No se encontraron eventos.');
        }
      } else {
        alert(data.message || 'Error al buscar eventos.');
      }
    } catch (error) {
      console.error('Error al buscar eventos:', error);
      alert('Ocurrió un error al buscar eventos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="admin-container">
      <div className="static-header1">
        <button className="menu-button" onClick={toggleMenu}>
          &#9776;
        </button>
        
        <div className={`header-buttons ${menuOpen ? 'open' : ''}`}>
          <button className="header-button-admin" onClick={() => setModalAbierto(true)}>
            Añadir evento
          </button>
          <button className="header-button-admin">Informes</button>
          
          {/* Botones para cambiar la vista */}
          <button className="header-button-admin" onClick={() => setVistaSeleccionada('eventos')}>
            Eventos
          </button>
          <button className="header-button-admin" onClick={() => setVistaSeleccionada('usuarios')}>
            Usuarios
          </button>

          <button className="header-button-admin">Organizadores</button>
          
          <img src={userImage} alt="Usuario" className="user-image" />
        </div>
      </div>

      <div className="Admin-body">
        {/* Mostrar la vista seleccionada */}
        {vistaSeleccionada === 'eventos' && (
          <Tabla eventos={eventos} onEdit={abrirModalActualizar} /> 
        )}
        {vistaSeleccionada === 'usuarios' && (
          <TableUsers /> // Aquí se muestra la tabla de usuarios
        )}
      </div>

      {/* Modales */}
      {modalAbierto && (
        <AddEventModal
          onClose={() => setModalAbierto(false)}
          onAdd={manejarAgregarEvento}
        />
      )}

      {modalActualizarAbierto && eventoActual && (
        <UpdateEventModal
          evento={eventoActual}
          onClose={() => setModalActualizarAbierto(false)}
          onUpdate={manejarActualizarEvento}
        />
      )}
    </div>
  );
}

export default Admin;
