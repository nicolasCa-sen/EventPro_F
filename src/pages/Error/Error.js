// ErrorPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as brokenLightbulb } from '@fortawesome/free-solid-svg-icons';
import './Error.css';

const ErrorPage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className='body-error'>
            <div className="error-principal-error">
                <FontAwesomeIcon icon={brokenLightbulb} size="6x" className="broken-bulb" /> {/* Usar el icono aquí */}
                <h1>Error 404</h1>
                <p>La página que estás buscando no se encontró.</p>
                <button className="btn-volver-error" onClick={handleBackToHome}>
                    Volver al inicio
                </button>
            </div>
            <div
                className="mouse-hover-area-error"
                style={{
                    left: mousePosition.x - 250 + 'px',
                    top: mousePosition.y - 250 + 'px',
                }}
            ></div>
        </div>
    );
};

export default ErrorPage;
