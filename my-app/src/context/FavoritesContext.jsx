import {createContext, useContext} from 'react';
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export function FavoritesProvider({children}) {
    const [favorites, setFavorites] = useLocalStorage("favorites", []);

    const addFavorite = (id) => {
        setFavorites((prev) => 
        prev.includes(id) ? prev : [...prev,id]);
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((favID) => favID !== id));
    };

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((favID) =>
            favID !== id) : [...prev, id]);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite: (id) => favorites.includes(id),
    };
    return (
        <FavoritesContext.Provider value = {value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be inside the provider.")
    }
    return context;
}

export default FavoritesContext;