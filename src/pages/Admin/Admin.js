import './Admin.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
import userImage from '../Images/admin.png';
import Tabla from './Table';
import AddEventModal from './AddEventModal'; // Asegúrate de importar el modal
import UpdateEventModal from './UpdateEventModal'; // Modal para actualizar eventos
import { useAuth } from '../../context/AuthContext';  // Asegúrate de importar el contexto de autenticación

function Admin() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para el modal de agregar
  const [modalActualizarAbierto, setModalActualizarAbierto] = useState(false); // Estado para el modal de actualizar
  const [eventoActual, setEventoActual] = useState(null); // Estado para el evento actual
  const navigate = useNavigate();
  const { user } = useAuth();  // Obtén el usuario desde el contexto de autenticación

  useEffect(() => {
    // Verifica si el usuario está autenticado, si no redirige al inicio
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]); // Este efecto se ejecutará cada vez que 'user' cambie

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const manejarClick = () => {
    navigate('/');
  };

  const manejarAgregarEvento = (nuevoEvento) => {
    console.log('Evento agregado:', nuevoEvento);
    // Lógica para guardar el nuevo evento
    setModalAbierto(false);
  };

  const manejarActualizarEvento = (evento) => {
    console.log('Evento actualizado:', evento);
    // Lógica para actualizar el evento
    setModalActualizarAbierto(false);
  };

  const abrirModalActualizar = (evento) => {
    setEventoActual(evento);
    setModalActualizarAbierto(true);
  };

  return (
    <div className="admin-container">
      <div className="static-header1">
        <button className="menu-button" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`header-buttons ${menuOpen ? 'open' : ''}`}>
          <button className="header-button-admin">Informes</button>
          <button className="header-button-admin">Eventos</button>
          <button className="header-button-admin">Usuarios</button>
          <button className="header-button-admin">Organizadores</button>
          <img src={userImage} alt="Usuario" className="user-image" />
        </div>
      </div>

      <header className="Admin-header1">
        <div className='filtre'>
          <select className="selector">
            <option>Filtrar por</option>
          </select>
          <input type="text" className="input-text" placeholder="Buscar evento..." />
          <button className="buscar-btn">Buscar</button>
          <button className="añadir-btn" onClick={() => setModalAbierto(true)}>Añadir evento</button>
        </div>
      </header>
      <body className='Admin-body'>
        <Tabla onEdit={abrirModalActualizar} /> {/* Pasa la función para editar eventos */}
      </body>

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