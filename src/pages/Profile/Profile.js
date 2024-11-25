import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';  // Asegúrate de tener el contexto adecuado
import './Profile.css';

const Profile = () => {
  const { user, token, updateUserProfile } = useAuth();  // Obtener usuario desde el contexto de autenticación
  const [email, setEmail] = useState(user?.email || '');
  const [telefono, setTelefono] = useState(user?.telefono || '');
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [identificacion, setIdentificacion] = useState(user?.identificacion || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(user?.fechaNacimiento || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  // Actualizar datos de usuario en el estado cuando el contexto se actualice
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setTelefono(user.telefono || '');  // Asegúrate de que existan estos datos
      setNombre(user.nombre || '');
      setApellido(user.apellido || '');
      setIdentificacion(user.identificacion || '');
      setFechaNacimiento(user.fechaNacimiento || '');
    }
  }, [user]);  // El hook se ejecutará cada vez que el estado del usuario cambie

  // Actualizar perfil con los nuevos datos
  const handleUpdateProfile = async () => {
    try {
      // Validación básica
      if (!email || !telefono || !nombre || !apellido || !identificacion || !fechaNacimiento) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      const updatedData = { email, telefono, nombre, apellido, identificacion, fechaNacimiento };
      const success = await updateUserProfile(updatedData, token);  // Función que actualiza los datos del perfil en la API

      if (success) {
        alert('Datos actualizados correctamente');
        setError(''); // Limpiar errores después de un éxito
      } else {
        setError('Hubo un error al actualizar los datos');
      }
    } catch (err) {
      setError('Hubo un error al intentar actualizar los datos');
    }
  };

  // Cambiar contraseña
  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      alert('Contraseña cambiada correctamente');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  // Ver compras del usuario
  const handleViewPurchases = () => {
    alert('Ver compras');
  };

  return (
    <div className="profile-profile-container">
      <div className="profile-profile-sections">
        <div className="profile-profile-info">
          <h2 className="profile-profile-title">Mi Perfil</h2>
          
          <div className="profile-profile-header">
            {/* Imagen de perfil */}
            <img src={user?.imagen || "https://via.placeholder.com/150"} alt="Imagen de perfil" className="profile-profile-image" />
            <div className="profile-profile-details">
              <div className="profile-profile-item">
                <label className="profile-profile-label">Nombre</label>
                <input type="text" className="profile-profile-input" value={nombre} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Apellido</label>
                <input type="text" className="profile-profile-input" value={apellido} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Identificación</label>
                <input type="text" className="profile-profile-input" value={identificacion} readOnly />
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
                <input type="text" className="profile-profile-input" value={fechaNacimiento} readOnly />
              </div>
            </div>
          </div>
          
          {/* Error message */}
          {error && <div className="profile-error-message">{error}</div>}
          
          <div className="profile-buttons-container">
            <button className="profile-profile-button-save" onClick={handleUpdateProfile}>
              Actualizar Datos
            </button>
            <button className="profile-profile-button-view" onClick={handleViewPurchases}>
              Ver Compras
            </button>
          </div>
        </div>

        <div className="profile-statistics">
          <h3 className="profile-statistics-title">Estadísticas</h3>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Eventos asistidos en el mes</label>
            <p className="profile-statistics-value">{user?.eventosMes || 0}</p>
          </div>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Eventos asistidos en el año</label>
            <p className="profile-statistics-value">{user?.eventosAno || 0}</p>
          </div>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Gasto total del mes</label>
            <p className="profile-statistics-value">{user?.gastoMes || "0"}</p>
          </div>
          <div className="profile-statistics-item">
            <label className="profile-statistics-label">Gasto total del año</label>
            <p className="profile-statistics-value">{user?.gastoAno || "0"}</p>
          </div>
          
          <div className="profile-change-password">
            <h3>Cambiar Contraseña</h3>
            <div className="profile-change-password-item">
              <label>Contraseña Nueva</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="profile-change-password-item">
              <label>Confirmar Contraseña</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className="profile-change-password-button" onClick={handleChangePassword}>
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
