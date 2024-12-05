import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext'; // Importar useAuth
import { useNavigate } from 'react-router-dom';
import './login.css';

import userImage from '../Images/user.png';
import adminImage from '../Images/admini.png';
import organizerImage from '../Images/organizadora.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const roles = [
    { name: 'Usuario', image: userImage },
    { name: 'Administrador', image: adminImage },
    { name: 'Organizador', image: organizerImage },
  ];

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  // Validación para email y contraseña
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de email
    if (!email || !emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

    // Validación de rol
    if (!role) {
      setError('Por favor selecciona un rol.');
      return;
    }

    setError(''); // Limpiar cualquier error previo

    try {
      const userInfo = { email, password, role };
      console.log('Intentando iniciar sesión con:', userInfo);

      // Llamada a la función login del contexto
      const isLoginSuccessful = await login(userInfo);

      if (isLoginSuccessful) {
        setIsLoggedIn(true);
        setError('');
        // Navegar según el rol
        if (role === 'Administrador') {
          navigate('/admin');
        } else if (role === 'Usuario') {
          navigate('/');
        } else if (role === 'Organizador') {
          navigate('/Org');
        }
      } else {
        setError('Usuario o rol incorrecto');
      }
    } catch (err) {
      setError('Hubo un error al intentar iniciar sesión. Intenta de nuevo más tarde.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <motion.div className="login-container" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2>INICIAR SESIÓN</h2>

        {isLoggedIn && <p className="success-message">¡Has iniciado sesión exitosamente!</p>}

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Selección de rol */}
          <div className="input-group">
            <label>Selecciona tu rol</label>
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
                        filter: role === r.name ? 'none' : 'grayscale(100%)',
                      }}
                    >
                      <span className="nombre-rol-per">{r.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Campo de email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
            />
          </div>

          {/* Campo de contraseña */}
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Botón para enviar el formulario */}
          <button type="submit">Ingresar</button>
        </form>

        {/* Enlace para registrarse */}
        <p className="register-prompt">
          ¿No tienes una cuenta? <span className="register-link" onClick={() => navigate('/registro')}>Regístrate Aquí</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
