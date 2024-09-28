import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const items = [
    { id: 1, title: 'Titulo 1', subtitle: 'Subtítulo 1' },
    { id: 2, title: 'Titulo 2', subtitle: 'Subtítulo 2' },
    { id: 3, title: 'Titulo 3', subtitle: 'Subtítulo 3' },
    { id: 4, title: 'Titulo 1', subtitle: 'Subtítulo 1' },
    { id: 5, title: 'Titulo 2', subtitle: 'Subtítulo 2' },
    { id: 6, title: 'Titulo 2', subtitle: 'Subtítulo 3' },
  ];

  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Filtrar items según el término de búsqueda
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      {/* Encabezado fijo en la parte superior */}
      <div className="static-header">
        <h1>Mi Aplicación</h1>
      </div>

      {/* Encabezado que no es estático */}
      <div className="dynamic-header">
        <h1>Encabezado Dinámico</h1>
        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar título..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
          className="search-input"
        />
      </div>

      <header className="App-header">
        {/* Renderizar los items filtrados con animación y estilos */}
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            className="card"
            onClick={() => setSelectedId(item.id)}
          >
            <motion.h2 className="card-title">{item.title}</motion.h2>
            <motion.h5 className="card-subtitle">{item.subtitle}</motion.h5>
          </motion.div>
        ))}

        {/* Mostrar detalles del item seleccionado con AnimatePresence */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              layoutId={selectedId}
              className="card-expanded"
              onClick={() => setSelectedId(null)} // Cerrar al hacer clic en el fondo
            >
              {filteredItems.map(item =>
                item.id === selectedId ? (
                  <React.Fragment key={item.id}>
                    <motion.h5 className="card-subtitle">{item.subtitle}</motion.h5>
                    <motion.h2 className="card-title">{item.title}</motion.h2>
                    <motion.button
                      className="card-button"
                      onClick={() => setSelectedId(null)}
                    >
                      Comprar
                    </motion.button>
                    <motion.button
                      className="card-button-close"
                      onClick={() => setSelectedId(null)}
                    >
                      ✘
                    </motion.button>
                  </React.Fragment>
                ) : null
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

export default App;
