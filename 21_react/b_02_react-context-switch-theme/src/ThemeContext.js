import { createContext, useState, useContext } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{ children }</ThemeContext.Provider>
};

export const useTheme = () => useContext(ThemeContext);
