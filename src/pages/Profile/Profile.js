import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';  // Asegúrate de tener el contexto adecuado
import { jsPDF } from "jspdf";  // Importar jsPDF
import './Profile.css';
import QRCode from 'qrcode';

const Profile = () => {
  const { user, token, updateUserProfile } = useAuth();  // Obtener usuario desde el contexto de autenticación
  const [email, setEmail] = useState(user?.email || '');
  const [telefono, setTelefono] = useState(user?.telefono || '');
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [identificacion, setIdentificacion] = useState(user?.identificacion || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(user?.fechaNacimiento || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [eventos, setEventos] = useState([]);  // Almacenará los eventos

  // Actualizar datos de usuario en el estado cuando el contexto se actualice
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setTelefono(user.telefono || '');  // Asegúrate de que existan estos datos
      setNombre(user.nombre || '');
      setApellido(user.apellido || '');
      setIdentificacion(user.identificacion || '');
      setFechaNacimiento(user.fechaNacimiento || '');
    }
  }, [user]);  // El hook se ejecutará cada vez que el estado del usuario cambie

  // Obtener eventos del backend
  useEffect(() => {
    const fetchEventosData = async () => {
      try {
        const response = await fetch(`https://eventpro-b.onrender.com/entrada/usuario/${user.id}/eventos-entradas`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Asegúrate de enviar el token si es necesario
          },
        });
        const data = await response.json();

        if (data.state) {
          // Llamada a la API de cada evento para obtener más detalles
          const eventosDetalles = await Promise.all(
            data.data.map(async (evento) => {
              const eventoResponse = await fetch(`https://eventpro-b.onrender.com/evento/${evento.id_evento}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const eventoData = await eventoResponse.json();
              return { ...evento, nombre: eventoData.data.nombre, fecha_inicio: eventoData.data.fecha_inicio };
            })
          );

          setEventos(eventosDetalles);  // Guardar los eventos con sus detalles en el estado
        }
      } catch (error) {
        console.error('Error al obtener los eventos y entradas:', error);
      }
    };

    if (user?.id) {
      fetchEventosData();
    }
  }, [user, token]);  // Vuelve a ejecutar si cambia el usuario o el token

  // Función para generar el PDF
  // Función para generar el PDF
  const handleGeneratePDF = async (evento) => {
    try {
      // Obtiene los datos del evento y la entrada
      const eventoResponse = await fetch(`https://eventpro-b.onrender.com/evento/${evento.id_evento}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventoData = await eventoResponse.json();
  
      const entradasResponse = await fetch(`https://eventpro-b.onrender.com/entrada/usuario/${user.id}/eventos-entradas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const entradasData = await entradasResponse.json();
  
      // Crear un nuevo PDF
      const doc = new jsPDF();
  
      // Encabezado del PDF (sección reutilizada del otro código)
      const eventoImagenURL = `https://eventpro-b.onrender.com${evento.imagen_principal}`;
      const eventoImagenBase64 = await convertToBase64(eventoImagenURL).catch((e) => {
        console.error("Error al convertir la imagen del evento a Base64:", e);
        return null;
      });
  
      doc.setFillColor(20, 39, 34);
      doc.rect(0, 0, 210, 30, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text("Event Pro - Confirmación de Compra", 105, 20, { align: "center" });
  
      if (eventoImagenBase64) {
        doc.addImage(eventoImagenBase64, "PNG", 10, 40, 60, 40);
      }
  
      // Información del usuario (añadido al encabezado)
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Nombre: ${user.nombre} ${user.apellido}`, 10, 50);
      doc.text(`Identificación: ${user.identificacion}`, 10, 60);
      doc.text(`Email: ${user.email}`, 10, 70);
      doc.text(`Teléfono: ${user.telefono}`, 10, 80);
  
      // Detalles del Evento
      doc.setFontSize(14);
      doc.text("Detalles del Evento", 10, 100);
      doc.setFontSize(12);
      doc.text(`Nombre del Evento: ${eventoData.data.nombre}`, 10, 110);
      doc.text(`Fecha de Inicio: ${eventoData.data.fecha_inicio}`, 10, 120);
  
      // Entradas compradas
      doc.text(`Cantidad de Entradas: ${evento.cantidad_entradas}`, 10, 130);
  
      // Crear un código QR para cada entrada
      const qrWidth = 40;
      const qrHeight = 40;
      const qrMarginX = 10;
      const qrMarginY = 140;
      let posX = qrMarginX;
      let posY = qrMarginY;
  
      const maxColumns = 4; // Cuántos códigos QR por fila
      const maxRows = 3;    // Cuántas filas de códigos QR
      let entriesOnPage = 0;
      const maxEntriesPerPage = maxColumns * maxRows;
  
      // Genera un código QR por cada entrada
      for (let i = 0; i < 1; i++) {
        if (i % maxEntriesPerPage === 0 && i !== 0) {
          doc.addPage();  // Agrega una nueva página después de llegar al máximo de entradas por página
          posY = qrMarginY;  // Reinicia la posición Y para la nueva página
          posX = qrMarginX;  // Reinicia la posición X para la nueva página
        }
  
        const entry = entradasData.data[i];
        const qrData = JSON.stringify({
          eventoId: evento.id_evento,
          eventoNombre: eventoData.data.nombre,
          entradaNumero: entry.id_entrada,  // Suponiendo que cada entrada tiene un id único
        });
  
        // Genera el código QR con la información de la entrada
        const qrCodeDataUrl = await QRCode.toDataURL(qrData);
  
        // Dibuja el código QR en el PDF
        doc.addImage(qrCodeDataUrl, "PNG", posX, posY, qrWidth, qrHeight);
        posX += qrWidth + 10;  // Mueve la posición X para el siguiente código QR
  
        if ((i + 1) % maxColumns === 0) {
          posX = qrMarginX;  // Reinicia la posición X al inicio de la fila
          posY += qrHeight + 10;  // Mueve la posición Y para la siguiente fila
        }
  
        entriesOnPage++;
      }
  
      // Muestra el PDF en una nueva ventana emergente
      window.open(doc.output('bloburl'), '_blank');
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
  
  const convertToBase64 = (url) => {
    return fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        });
};

  return (
    <div className="profile-profile-container">
      <div className="profile-profile-sections">
        <div className="profile-profile-info">
          <h2 className="profile-profile-title">Mi Perfil</h2>
          
          <div className="profile-profile-header">
            {/* Imagen de perfil */}
            <img src={user?.imagen || "https://via.placeholder.com/150"} alt="Imagen de perfil" className="profile-profile-image" />
            <div className="profile-profile-details">
              <div className="profile-profile-item">
                <label className="profile-profile-label">Nombre</label>
                <input type="text" className="profile-profile-input" value={nombre} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Apellido</label>
                <input type="text" className="profile-profile-input" value={apellido} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Identificación</label>
                <input type="text" className="profile-profile-input" value={identificacion} readOnly />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Email</label>
                <input
                  type="email"
                  className="profile-profile-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profile-profile-item">
                <label className="profile-profile-label">Teléfono</label>
                <input
                  type="tel"
                  className="profile-profile-input"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Error message */}
          {error && <div className="profile-error-message">{error}</div>}
          
        </div>

        <div className="profile-statistics">
          
          {/* Tabla de eventos dentro de estadísticas */}
          <div className="profile-statistics-item">
            <h4>Eventos y Entradas</h4>
            <table className="profile-events-table">
              <thead>
                <tr>
                  <th>Nombre del Evento</th>
                  <th>Cantidad de Entradas</th>
                  <th>Fecha de Inicio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((evento) => (
                  <tr key={evento.id_evento}>
                    <td>{evento.nombre}</td>
                    <td>{evento.cantidad_entradas}</td>
                    <td>{evento.fecha_inicio}</td>
                    <td>
                      <button onClick={() => handleGeneratePDF(evento)}>Recibo</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Profile;
