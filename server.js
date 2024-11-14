const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta para borrar el contenido de usuarioNuevo.json
app.put('/usuarioNuevo', (req, res) => {
  const usuarioNuevoPath = path.join(__dirname, 'usuarioNuevo.json');

  // Borrar el contenido de usuarioNuevo.json (escribiendo un objeto vacío)
  fs.writeFile(usuarioNuevoPath, JSON.stringify({}, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error al borrar usuarioNuevo.json');
    }
    res.json({ message: 'Contenido de usuarioNuevo.json borrado correctamente' });
  });
});

// Ruta para registrar un usuario y guardarlo en ambos archivos
app.post('/registro', (req, res) => {
  const nuevoUsuario = req.body;

  // Ruta para los archivos JSON
  const dbPath = path.join(__dirname, 'db.json');
  const usuarioNuevoPath = path.join(__dirname, 'usuarioNuevo.json');

  // Leer db.json
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer db.json');
    }

    // Parsear la base de datos
    const db = JSON.parse(data);
    
    // Guardar el nuevo usuario en el array de usuarios de db.json
    db.usuarios.push(nuevoUsuario);

    // Escribir en db.json con el nuevo usuario
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error al guardar en db.json');
      }
    });
  });

  // Guardar el último usuario en usuarioNuevo.json
  fs.writeFile(usuarioNuevoPath, JSON.stringify(nuevoUsuario, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error al guardar en usuarioNuevo.json');
    }

    // Responder que el registro fue exitoso
    res.json({ message: 'Usuario registrado correctamente' });
  });
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
