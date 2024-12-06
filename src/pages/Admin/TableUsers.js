import React, { useState, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './TableUsers.css';

const TableUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  useEffect(() => {
    // Cargar los usuarios desde la API
    fetch('https://eventpro-b.onrender.com/usuario/usuarios')  // URL de la API de usuarios
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data.data);
        setUsuariosFiltrados(data.data); // Inicializar los datos filtrados
      })
      .catch((error) => console.error('Error al cargar los usuarios:', error));
  }, []);

  // Filtrar usuarios
  const handleSearch = () => {
    if (filtro === 'nombre') {
      const filtrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    } else if (filtro === 'email') {
      const filtrados = usuarios.filter((usuario) =>
        usuario.email.toLowerCase().includes(busqueda.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    } else {
      setUsuariosFiltrados(usuarios); // Si no hay filtro, mostrar todos
    }
  };

  return (
    <div className="tabla-users-container-alluser">
      <h2>Lista de Usuarios Registrados</h2>

      {/* Barra de filtros */}
      <div className="filtro-container-users-alluser">
        <select
          className="filtro-select-users-alluser"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setBusqueda('');
          }}
        >
          <option value="">Seleccionar filtro</option>
          <option value="nombre">Nombre</option>
          <option value="email">Correo</option>
        </select>

        <input
          type="text"
          className="filtro-input-users-alluser"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="buscar-btn-users-alluser" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      <table className="tabla-users-alluser">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th> {/* Columna de Apellido añadida */}
            <th>Identificación</th> {/* Columna de Identificación añadida */}
            <th>Correo</th>
            <th>Fecha Nacimiento</th> {/* Cambié la columna a "Fecha Nacimiento" */}
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td> {/* Mostrar Apellido */}
              <td>{usuario.identificacion}</td> {/* Mostrar Identificación */}
              <td>{usuario.email}</td>
              <td>{usuario.fecha_nacimiento}</td> {/* Mostrar fecha de nacimiento */}
              <td>
                <button
                  className="icon-btn-users-alluser eliminar-btn-users-alluser"
                  onClick={() => console.log('Eliminar usuario')}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
