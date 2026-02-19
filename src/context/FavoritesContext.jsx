import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    // Initialize state lazily from local storage to avoid overwriting on first render
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem('samskruti_favorites');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to parse favorites", e);
            return [];
        }
    });

    // Save to local storage whenever favorites change
    useEffect(() => {
        try {
            localStorage.setItem('samskruti_favorites', JSON.stringify(favorites));
        } catch (e) {
            console.error("Failed to save favorites (quota exceeded?)", e);
        }
    }, [favorites]);

    const addFavorite = (item) => {
        console.log("Adding favorite:", item.id);
        setFavorites((prev) => {
            if (prev.some(fav => fav.id === item.id)) return prev; // Avoid duplicates
            return [...prev, { ...item, savedAt: new Date().toISOString() }];
        });
    };

    const removeFavorite = (itemId) => {
        console.log("Removing favorite:", itemId);
        setFavorites((prev) => prev.filter((item) => item.id !== itemId));
    };

    const isFavorite = (itemId) => {
        return favorites.some((item) => item.id === itemId);
    };

    const toggleFavorite = (item) => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
