import React from 'react';
import ReactDOM from 'react-dom/client'; // Usar createRoot en lugar de render
import './index.css';
import Home from './pages/Home/Home'; // Importar Home
import Admin from './pages/Admin/Admin'; // Importar Admin
import Login from './pages/Login/login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Home/Header'; // Importar Header
import Error from './pages/Error/Error';
import EventoDetalles from './pages/Seleccionado/EventoDetalles';
import { AuthProvider } from './context/AuthContext'; // Importar el AuthProvider

// Se usa createRoot para compatibilidad con React 18 y su sistema de concurrent rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Aquí se envuelve la aplicación con el AuthProvider */}
      <Router>
        {/* El Header debe estar fuera de las rutas para que sea visible siempre */}
        <Header />
        <Routes>
          {/* Definir la ruta para Home */}
          <Route path="/" element={<Home />} /> {/* Ruta raíz para Home */}
          {/* Definir la ruta para Login */}
          <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
          {/* Definir la ruta para Admin */}
          <Route path="/admin" element={<Admin />} /> {/* Ruta para Admin */}
          {/* Definir la ruta para Registro */}
          <Route path="/registro" element={<Register />} /> {/* Ruta para Registro */}
          {/* Ruta para el detalle del evento */}
          <Route path="/evento/:id" element={<EventoDetalles />} />
           {/* Ruta para el detalle del perfil */}
           <Route path="/profile" element={<Profile />} />
          {/* Ruta de error 404 */}
          <Route path="*" element={<Error />} /> {/* Ruta para Error */}
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
