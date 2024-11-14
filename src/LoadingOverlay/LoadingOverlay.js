import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
    const { isLoading, setIsLoading } = useLoading();
    const location = useLocation();

    useEffect(() => {
        // Muestra la carga cuando cambia la ruta
        setIsLoading(true);

        // Oculta la carga después de un breve retraso para simular el tiempo de carga
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [location, setIsLoading]);

    return isLoading ? (
        <div className="loading-overlay-cargando">
            <div className="loading-header-cargando">EvenT Pro</div>
            <svg viewBox="0 0 240 240" height="240" width="240" className="loader-cargando">
                <circle
                    strokeLinecap="round"
                    strokeDashoffset="-330"
                    strokeDasharray="0 660"
                    strokeWidth="20"
                    stroke="#a9c9c3" 
                    fill="none"
                    r="105"
                    cy="120"
                    cx="120"
                    className="loader-ring-cargando loader-ring-a-cargando"
                ></circle>
                <circle
                    strokeLinecap="round"
                    strokeDashoffset="-110"
                    strokeDasharray="0 220"
                    strokeWidth="20"
                    stroke="#91b1ab" // Variación de #d2e8e3
                    fill="none"
                    r="35"
                    cy="120"
                    cx="120"
                    className="loader-ring-cargando loader-ring-b-cargando"
                ></circle>
                <circle
                    strokeLinecap="round"
                    strokeDasharray="0 440"
                    strokeWidth="20"
                    stroke="#7a9b96" // Variación de #d2e8e3
                    fill="none"
                    r="70"
                    cy="120"
                    cx="85"
                    className="loader-ring-cargando loader-ring-c-cargando"
                ></circle>
                <circle
                    strokeLinecap="round"
                    strokeDasharray="0 440"
                    strokeWidth="20"
                    stroke="#64857f" // Variación de #d2e8e3
                    fill="none"
                    r="70"
                    cy="120"
                    cx="155"
                    className="loader-ring-cargando loader-ring-d-cargando"
                ></circle>
            </svg>
        </div>
    ) : null;
};

export default LoadingOverlay;
