import './Admin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png'; // Ruta al logo
import userImage from '../Images/logo.png'; // Ruta a la imagen del usuario
import Tabla from './Table';
import AddEventModal from './AddEventModal'; // Asegúrate de importar el modal
import styles from './UpdateEventModal.css';

function Admin() {
  const [estado, setEstado] = useState(); // Ejemplo de estado (personaliza según necesites)
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para el modal
  const navigate = useNavigate(); // Usar useNavigate para la navegación

  // Alternar la visibilidad del menú en pantallas pequeñas
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const manejarClick = () => {
    navigate('/'); // Ejemplo de navegación (personaliza la ruta)
  };

  const manejarAgregarEvento = (nuevoEvento) => {
    console.log('Evento agregado:', nuevoEvento);
    // Aquí puedes agregar la lógica para guardar el nuevo evento (por ejemplo, hacer una llamada a una API o actualizar el estado)
    setModalAbierto(false); // Cerrar el modal después de agregar el evento
  };

  return (
    <div className="admin-container">
      <div className="static-header1">
        <img src={logo} alt="Logo" className="app-logo" />

        {/* Botón de menú para pantallas pequeñas */}
        <button className="menu-button" onClick={toggleMenu}>
          &#9776;
        </button>

        {/* Contenedor para los botones y la imagen */}
        <div className={`header-buttons ${menuOpen ? 'open' : ''}`}>
          <button className="header-button-admin">Informes</button>
          <button className="header-button-admin">Eventos</button>
          <button className="header-button-admin">Usuarios</button>
          <button className="header-button-admin">Organizadores</button>
          <button className="header-button-admin">Cerrar sesión</button>
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
        <Tabla />
      </body>

      {modalAbierto && (
        <AddEventModal onClose={() => setModalAbierto(false)} onAdd={manejarAgregarEvento} />
      )}
    </div>
  );
}

export default Admin;
