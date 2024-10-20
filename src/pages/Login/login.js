import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './login.css';

import userImage from '../Images/user.png';
import adminImage from '../Images/admini.png'; // Asegúrate de usar la ruta correcta
import organizerImage from '../Images/organizadora.png'; // Asegúrate de usar la ruta correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Estado para el rol
  const [error, setError] = useState('');

  const roles = [
    { name: 'Usuario', image: userImage },
    { name: 'Administrador', image: adminImage },
    { name: 'Organizador', image: organizerImage },
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
      console.log('Inicio de sesión exitoso:');
      console.log(`Email: ${email}`);
      console.log(`Contraseña: ${password}`);
      console.log(`Rol: ${role}`);
      // Aquí se manejaría la autenticación real.
    }
  };

  const containerClass =
    role === 'Administrador'
      ? 'admin-bg'
      : role === 'Organizador'
      ? 'organizer-bg'
      : 'user-bg';

  return (
    <div className={`App ${containerClass}`}>
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>INICIAR SESIÓN</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Selecciona tu rol</label>
            <div className="toggle-group">
              <div className="role-selection">
                <div className="role-images">
                  {roles.map((r) => (
                    <div
                      key={r.name}
                      className={`role-image ${
                        role === r.name ? 'active' : ''
                      }`}
                      onClick={() => handleRoleChange(r.name)}
                      style={{
                        backgroundImage: `url(${r.image})`,
                        filter:
                          role === r.name ? 'none' : 'grayscale(100%)',
                      }}
                    >
                      <span className="nombre-rol-per">{r.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
          <button type="submit">Ingresar</button>
        </form>
        <div className="register-link">
          <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
