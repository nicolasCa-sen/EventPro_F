import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';  // Asegúrate de que esta imagen exista en el path correcto
import userImage from '../Images/admin.png';  // Asegúrate de que esta imagen exista en el path correcto
import { useAuth } from '../../context/AuthContext';  // Contexto de autenticación
import './Org.css';
// Si no usas los modales, elimina estas importaciones
 import AddEventModal from './AddEventModal';
 import UpdateEventModal from './UpdateEventModal';

function Org() {
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
    <div className="org-container-org">
      <div className="static-header1-org">
  <div className="header-buttons-org">
    <button className="header-button-org">Informes</button>
    <button className="header-button-org">Eventos</button>
    <button className="header-button-org">Usuarios</button>
    <button className="header-button-org">Organizadores</button>
  </div>
  <img src={userImage} alt="Usuario" className="user-image-org" />
</div>


      <header className="Org-header1-org">
        <div className='filtre-org'>
          <select className="selector-org">
            <option>Filtrar por</option>
          </select>
          <input type="text" className="input-text-org" placeholder="Buscar evento..." />
          <button className="buscar-btn-org">Buscar</button>
          <button className="añadir-btn-org" onClick={() => setModalAbierto(true)}>Añadir evento</button>
        </div>
      </header>
      <body className='Org-body-org'>
        {/* Aquí puedes agregar la Tabla si es necesario */}
      </body>

      {/* Solo muestra los modales si los componentes están importados */}
      {modalAbierto && (
        // Si no importaste AddEventModal, elimínalo aquí
        <AddEventModal 
          onClose={() => setModalAbierto(false)} 
          onAdd={manejarAgregarEvento} 
        />
      )}

      {modalActualizarAbierto && eventoActual && (
        // Si no importaste UpdateEventModal, elimínalo aquí
        <UpdateEventModal 
          evento={eventoActual} 
          onClose={() => setModalActualizarAbierto(false)} 
          onUpdate={manejarActualizarEvento} 
        />
      )}
    </div>
  );
}

export default Org;
