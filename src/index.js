import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home/Home'; // Importar Home
import Admin from './pages/Admin/Admin'; // Importar Admin
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Home/Header';
import Error from './pages/Error/Error';
import EventoDetalles from './pages/Seleccionado/EventoDetalles';

ReactDOM.render(
  <React.StrictMode>
   <Router>
      <Routes>
        {/* Definir la ruta para Home */}
        <Route path="/" element={<Home />} /> {/* Ruta raíz para Home */}
        {/* Definir la ruta para Login */}
        <Route path="/Login" element={<Login />} /> {/* Ruta para Login */}
          {/* Definir la ruta para Admin */}
          <Route path="/admin" element={<Admin />} /> {/* Ruta para Admin */}
          {/* Definir la ruta para Admin */}
          <Route path="/registro" element={<Register />} /> {/* Ruta para Admin */}
           {/* Definir la ruta para Header */}
           <Route path="/header" element={<Header />} /> {/* Ruta para Admin */}
           <Route path="*" element={<Error />} /> {/* Ruta para Admin */}
            {/* Definir la ruta para seleccionado */}
            <Route path="/evento/:id" element={<EventoDetalles />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
