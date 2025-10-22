import React, { createContext, useState, useContext } from 'react';

const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
    const [aboutAccessGranted, setAboutAccessGranted] = useState(false);

    const grantAboutAccess = () => {
        setAboutAccessGranted(true);
    };

    return (
        <AboutContext.Provider value={{ aboutAccessGranted, grantAboutAccess }}>
            {children}
        </AboutContext.Provider>
    );
};

export const useAbout = () => {
    const context = useContext(AboutContext);
    if (!context) {
        throw new Error('useAbout must be used within an AboutProvider');
    }
    return context;
};