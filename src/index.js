import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home/Home'; // Importar Home
import Admin from './pages/Admin/Admin'; // Importar Admin
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
   <Router>
      <Routes>
        {/* Definir la ruta para Home */}
        <Route path="/" element={<Home />} /> {/* Ruta raíz para Home */}
        {/* Definir la ruta para App */}
       
          {/* Definir la ruta para Admin */}
          <Route path="/admin" element={<Admin />} /> {/* Ruta para Admin */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
