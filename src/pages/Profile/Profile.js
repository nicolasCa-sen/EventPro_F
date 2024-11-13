import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // Datos del perfil directamente en el código
  const userData = {
    nombre: "Sara Valentina",
    apellido: "Caceres Arevalo",
    identificacion: "123456789",
    email: "sara@gmail.com",
    telefono: "3214568709",
    fechaNacimiento: "05/08/2001",
    imagen: "https://via.placeholder.com/150" // Puedes cambiar esta URL por la imagen que desees
  };

  // Datos de estadísticas directamente en el código
  const userStats = {
    eventosMes: 1,
    eventosAno: 3,
    gastoMes: "600.000",
    gastoAno: "150.000"
  };

  // Estado para editar datos del perfil
  const [email, setEmail] = useState(userData.email);
  const [telefono, setTelefono] = useState(userData.telefono);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = () => {
    // Lógica para actualizar el correo y teléfono
    alert('Datos actualizados correctamente');
  };

  const handleChangePassword = () => {
    // Lógica para cambiar la contraseña
    if (newPassword === confirmPassword) {
      alert('Contraseña cambiada correctamente');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  const handleViewPurchases = () => {
    // Lógica para ver las compras
    alert('Ver compras');
  };

  return (
    <div className="profile-profile-container">
      {/* Contenedor principal */}
      <div className="profile-profile-sections">
        
        {/* Sección de perfil */}
        <div className="profile-profile-info">
          <h2 className="profile-profile-title">Mi Perfil</h2>
          
          <div className="profile-profile-header">
            {/* Imagen de perfil */}
            <img src={userData.imagen} alt="Imagen de perfil" className="profile-profile-image" />
            <div className="profile-profile-details">
              <div className="profile-profile-item">
                <label className="profile-profile-label">Nombre</label>
                <input type="text" className="profile-profile-input" value={userData.nombre} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Apellido</label>
                <input type="text" className="profile-profile-input" value={userData.apellido} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Identificación</label>
                <input type="text" className="profile-profile-input" value={userData.identificacion} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Email</label>
                <input
                  type="email"
                  className="profile-profile-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Teléfono</label>
                <input
                  type="tel"
                  className="profile-profile-input"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Fecha de Nacimiento</label>
                <input type="text" className="profile-profile-input" value={userData.fechaNacimiento} readOnly />
              </div>
            </div>
          </div>
          
          {/* Botones de Actualizar Datos y Ver Compras */}
          <div className="profile-buttons-container">
            <button className="profile-profile-button-save" onClick={handleUpdateProfile}>
              Actualizar Datos
            </button>
            <button className="profile-profile-button-view" onClick={handleViewPurchases}>
              Ver Compras
            </button>
          </div>
        </div>

        {/* Sección de estadísticas */}
        <div className="profile-statistics">
          <h3 className="profile-statistics-title">Estadísticas</h3>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Eventos asistidos en el mes</label>
            <p className="profile-statistics-value">{userStats.eventosMes}</p>
          </div>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Eventos asistidos en el año</label>
            <p className="profile-statistics-value">{userStats.eventosAno}</p>
          </div>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Gasto total del mes</label>
            <p className="profile-statistics-value">{userStats.gastoMes}</p>
          </div>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Gasto total del año</label>
            <p className="profile-statistics-value">{userStats.gastoAno}</p>
          </div>
          
          {/* Sección de cambio de contraseña */}
          <div className="profile-change-password">
            <h3>Cambiar Contraseña</h3>
            <div className="profile-profile-item">
              <label className="profile-profile-label">Nueva Contraseña</label>
              <input
                type="password"
                className="profile-profile-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="profile-profile-item">
              <label className="profile-profile-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="profile-profile-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="profile-profile-button-save" onClick={handleChangePassword}>
              Cambiar Contraseña
            </button>
          </div>
        </div>

      </div>

      <button className="profile-profile-button-logout">Cerrar sesión</button>
    </div>
  );
};

export default Profile;
