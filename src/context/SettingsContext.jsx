import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [ttsSettings, setTtsSettings] = useState(() => {
        const saved = localStorage.getItem('tts_settings');
        return saved ? JSON.parse(saved) : {
            rate: 1.0,
            voice: 'default'
        };
    });

    useEffect(() => {
        localStorage.setItem('tts_settings', JSON.stringify(ttsSettings));
    }, [ttsSettings]);

    const updateTtsSettings = (newSettings) => {
        setTtsSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ ttsSettings, updateTtsSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
