import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './login.css';

import userImage from '../Images/user.png';
import adminImage from '../Images/admin.png'; // Asegúrate de usar la ruta correcta
import organizerImage from '../Images/organizador.png'; // Asegúrate de usar la ruta correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Usuario'); // Estado para el rol
  const [error, setError] = useState('');

  const roles = [
    { name: 'Usuario', image: userImage },
    { name: 'Administrador', image: adminImage },
    { name: 'Organizador', image: organizerImage }
  ];

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole); // Cambia el rol según la imagen seleccionada
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
    } else {
      setError('');
      // Aquí se imprime la información en un formato más legible
      console.log('Inicio de sesión exitoso:');
      console.log(`Email: ${email}`);
      console.log(`Contraseña: ${password}`);
      console.log(`Rol: ${role}`);
      // Aquí se manejaría la autenticación real.
    }
  };

  // Clase dinámica para cambiar el fondo según el rol
  const containerClass = 
    role === 'Administrador' ? 'admin-bg' : 
    role === 'Organizador' ? 'organizer-bg' : // Clase para el organizador
    'user-bg';

  return (
    <div className={`App ${containerClass}`}>
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <h3>Selecciona tu rol</h3>
          <div className="toggle-group">
            <div className="role-selection">
              <div className="role-images">
                {roles.map((r) => (
                  <div 
                    key={r.name} 
                    className={`role-image ${role === r.name ? 'active' : ''}`} 
                    onClick={() => handleRoleChange(r.name)}
                    style={{ 
                      backgroundImage: `url(${r.image})`,
                      filter: role === r.name ? 'none' : 'grayscale(100%)' // Aplica un filtro de escala de grises
                    }}
                  >
                   <span className='nombre-rol-per'>{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
