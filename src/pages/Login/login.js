import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import './login.css';

import userImage from '../Images/user.png';
import adminImage from '../Images/admini.png'; 
import organizerImage from '../Images/organizadora.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar el login exitoso
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const { login } = useAuth(); // Utilizamos el hook para acceder a la función de login

  const roles = [
    { name: 'Usuario', image: userImage },
    { name: 'Administrador', image: adminImage },
    { name: 'Organizador', image: organizerImage },
  ];

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole); 
  };

  // Expresión regular para validar el correo
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular para validar la contraseña (mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga)
    
    // Validación de correo
    if (!email || !emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

 

    // Verificar si el rol está seleccionado
    if (!role) {
      setError('Por favor selecciona un rol.');
      return; // Detener la ejecución si falta algún campo
    }
    
    // Limpiar cualquier mensaje de error
    setError('');

    // Llamar al login con la información del usuario
    const userInfo = { email, password, role }; // Incluimos también la contraseña
    console.log('Intentando iniciar sesión con:', userInfo);

    try {
      // Llamada a la función login del contexto
      const isLoginSuccessful = await login(userInfo); // Esperamos la respuesta del login

      if (isLoginSuccessful) {
        // Si el login es exitoso, mostramos el mensaje
        setIsLoggedIn(true);
        setError(''); // Limpiar cualquier mensaje de error
        
        // Si el rol es "Administrador", redirigimos a /admin
        if (role === 'Administrador') {
          navigate('/admin');
        }
        if (role === 'Usuario') {
          navigate(-1); // Regresa a la página anterior
      }
      
        if (role === 'Organizador') {
          navigate('/Org');
        }
      } else {
        setError('Usuario o rol incorrecto');
      }
    } catch (err) {
      // En caso de error durante el login
      setError('Hubo un error al intentar iniciar sesión. Intenta de nuevo más tarde.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <motion.div className="login-container" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2>INICIAR SESIÓN</h2>
        
        {/* Si el usuario está logueado, mostramos un mensaje de bienvenida */}
        {isLoggedIn && <p className="success-message">¡Has iniciado sesión exitosamente!</p>}
        
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
                      className={`role-image ${role === r.name ? 'active' : ''}`}
                      onClick={() => handleRoleChange(r.name)}
                      style={{ backgroundImage: `url(${r.image})`, filter: role === r.name ? 'none' : 'grayscale(100%)' }}
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
