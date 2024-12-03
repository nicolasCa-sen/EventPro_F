import React from 'react';
import './Inicio.css'; // Archivo CSS para los estilos
import { useTheme } from '../../context/ThemeContext'; // Importar el contexto del tema

const Inicio = () => {
    const { isDarkMode } = useTheme(); // Obtener el estado del tema desde el contexto

    return (
        <header className={`Home-header-inicio ${isDarkMode ? 'dark-inicio' : 'light-inicio'}`}>
            <div className="container-inicio">
                <div className={`box box1-inicio ${isDarkMode ? 'dark-box-inicio' : 'light-box-inicio'}`}>
                    <div className={`text-inicio ${isDarkMode ? 'dark-text-inicio' : 'light-text-inicio'}`}>
                        EvenT Proo
                    </div>
                    <div className={`text1-inicio ${isDarkMode ? 'dark-text1-inicio' : 'light-text1-inicio'}`}>
                        Hacemos que cada momento cuente.<br />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Inicio;
