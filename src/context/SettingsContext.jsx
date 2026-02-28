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

    const [textSize, setTextSize] = useState(() => {
        return localStorage.getItem('text_size') || 'medium';
    });

    useEffect(() => {
        localStorage.setItem('tts_settings', JSON.stringify(ttsSettings));
    }, [ttsSettings]);

    useEffect(() => {
        localStorage.setItem('text_size', textSize);
        // Apply CSS variable for root sizing
        let fontSize = '16px';
        switch (textSize) {
            case 'small': fontSize = '14px'; break;
            case 'medium': fontSize = '16px'; break;
            case 'large': fontSize = '18px'; break;
            case 'xlarge': fontSize = '20px'; break;
        }
        document.documentElement.style.setProperty('--font-base-size', fontSize);
    }, [textSize]);

    const updateTtsSettings = (newSettings) => {
        setTtsSettings(prev => ({ ...prev, ...newSettings }));
    };

    const updateTextSize = (newSize) => {
        setTextSize(newSize);
    };

    return (
        <SettingsContext.Provider value={{ ttsSettings, updateTtsSettings, textSize, updateTextSize }}>
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
