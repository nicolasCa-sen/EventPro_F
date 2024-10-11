import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Content/App';
import Home from './pages/Home/Home'; // Importar Home
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
   <Router>
      <Routes>
        {/* Definir la ruta para Home */}
        <Route path="/" element={<Home />} /> {/* Ruta raíz para Home */}
        {/* Definir la ruta para App */}
        <Route path="/app" element={<App />} /> {/* Ruta para App */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
