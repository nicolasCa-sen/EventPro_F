import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Home/Header';
import Error from './pages/Error/Error';
import EventoDetalles from './pages/Seleccionado/EventoDetalles';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext'; // Importa el LoadingProvider
import LoadingOverlay from './LoadingOverlay/LoadingOverlay'; // Importa el componente de carga
import Org from './pages/Organizador/Org'; // Importa el componente de carga
import { ThemeProvider } from './context/ThemeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <ThemeProvider>
    <AuthProvider>
      <LoadingProvider> {/* Envuelve toda la aplicación en el LoadingProvider */}
        <Router>
          <Header />
          <LoadingOverlay /> {/* Agrega el componente de carga aquí para que esté en todas las rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/evento/:id" element={<EventoDetalles />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/error" element={<Error />} />
            <Route path="/org" element={<Org />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </LoadingProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
