import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto para la visibilidad de la sección de inicio
const SectionVisibilityContext = createContext();

export const useSectionVisibility = () => useContext(SectionVisibilityContext);

export const SectionVisibilityProvider = ({ children }) => {
    // Usamos un estado para controlar si la sección de inicio está visible o no
    const [isInicioVisible, setInicioVisible] = useState(true);

    // Función para alternar la visibilidad de la sección de inicio
    const toggleInicioVisibility = () => {
        setInicioVisible(prevState => !prevState);
    };

    return (
        <SectionVisibilityContext.Provider value={{ isInicioVisible, toggleInicioVisibility }}>
            {children}
        </SectionVisibilityContext.Provider>
    );
};
