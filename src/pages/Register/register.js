import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';  // Importa motion
import bcrypt from 'bcryptjs';  // Importa bcryptjs
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    fechaNacimiento: '',
    telefono: '',
    rol: 'Usuario', // Establece el rol de manera fija
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellido, identificacion, email, contraseña, confirmarContraseña, fechaNacimiento, telefono, rol } = formData;

    // Expresiones regulares para validaciones
    const nombreApellidoRegex = /^[A-Za-zÁ-ÿ\s]+$/;  // Solo letras y espacios
    const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;  // Al menos una mayúscula, una minúscula y un número
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Formato de email válido
    const numeroRegex = /^\d+$/;  // Solo números

    // Validación de edad (mínimo 15 años)
    const edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();

    // Validar campos
    if (!nombre || !apellido || !email || !contraseña || !confirmarContraseña || !fechaNacimiento || !telefono || !identificacion) {
      setError('Por favor completa todos los campos obligatorios.');
    } else if (!nombreApellidoRegex.test(nombre) || !nombreApellidoRegex.test(apellido)) {
      setError('El nombre y apellido solo pueden contener letras.');
    } else if (!contraseñaRegex.test(contraseña)) {
      setError('La contraseña debe contener al menos una mayúscula, una minúscula y un número.');
    } else if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
    } else if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo electrónico válido.');
    } else if (edad < 15) {
      setError('Debes tener al menos 15 años para registrarte.');
    } else if (!numeroRegex.test(identificacion)) {
      setError('La identificación debe contener solo números.');
    } else if (!numeroRegex.test(telefono)) {
      setError('El teléfono debe contener solo números.');
    } else {
      setError('');

      // Encriptar la contraseña antes de enviarla
      try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);  // Encriptamos la contraseña con bcrypt
        const updatedFormData = { 
          id: null, // Este campo generalmente lo maneja la base de datos, por lo que lo dejamos como null
          nombre,
          apellido,
          identificacion,
          rol,  // 'Usuario'
          email,
          contraseña: hashedPassword,
          telefono,
          fecha_nacimiento: fechaNacimiento,
          numero_cuenta: null,  // Si no se necesita, lo establecemos en null
          numero_credencial: null,  // Igualmente en null
          id_organizacion: null  // En null si no es relevante
        };

        const response = await axios.post('https://eventpro-b.onrender.com/usuario/', updatedFormData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setSuccessMessage('Registro exitoso');
        console.log('Registro exitoso:', response.data);
      } catch (error) {
        console.error('Error al registrar:', error);
        setError(error.response?.data?.error || 'Hubo un error al registrar los datos');
      }
    }
  };

  return (
    <div className="App-reg">
      <motion.div
        className="login-container-reg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="h2-reg">Registro</h2>
        {error && <p className="error-reg">{error}</p>}
        {successMessage && <p className="success-reg">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid-reg">
            <div className="input-group-reg">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="input-group-reg">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
              />
            </div>
            <div className="input-group-reg">
              <label>Identificación</label>
              <input
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                placeholder="Ingresa tu identificación"
              />
            </div>
            <div className="input-group-reg">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
              />
            </div>
            <div className="input-group-reg">
              <label>Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="input-group-reg">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmarContraseña"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
              />
            </div>
            <div className="input-group-reg">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-reg">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingresa tu teléfono"
              />
            </div>
          </div>
          <button className="button-reg" type="submit">Registrar</button>
        </form>
        <div className="login-link-reg">
          <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
