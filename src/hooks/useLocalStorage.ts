import { useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: T): [T, (storedValue: T) => void] {
    const [storedValue, setValue] = useState<T>(() => {
        try {
            const storedData = localStorage.getItem(key);
            return storedData ? JSON.parse(storedData) as T : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const setStoredValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [storedValue, setStoredValue];
}

export default useLocalStorage;