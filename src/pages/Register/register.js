import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    email: '',
    contraseña: '',
    fechaNacimiento: '',
    telefono: '',
    numeroCuenta: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, apellido, email, contraseña } = formData;

    if (!nombre || !apellido || !email || !contraseña) {
      setError('Por favor completa todos los campos obligatorios.');
    } else {
      setError('');
      console.log('Registro exitoso:', formData);
      // Aquí iría la lógica para enviar la información a la API o backend.
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
            <div className="input-group-reg">
              <label>Número de Cuenta</label>
              <input
                type="text"
                name="numeroCuenta"
                value={formData.numeroCuenta}
                onChange={handleChange}
                placeholder="Ingresa tu número de cuenta"
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
