import {useCallback} from 'react';
import useLocalStorage from "./useLocalStorage";

export default function usePantry() {
    const [pantry, setPantry] = useLocalStorage("pantry-items", []);

    const addItem = useCallback((item) => {
        setPantry((prev) => {
            if (prev.includes(item)) return prev;
            return [...prev, item];
        });
    }, [setPantry]);

    const removeItem = useCallback((item) => {
        setPantry((prev) => prev.filter((i) => i !== item));
    }, [setPantry]);

    const clearPantry = useCallback(() => {
        setPantry([]);
    }, [setPantry]);

    return {
        pantry,
        addItem,
        removeItem,
        clearPantry
    };
}