import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

function ThemeToggler() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <>
            {theme === "light" ? (
                <Sun onClick={toggleTheme} />
            ) : (
                <Moon onClick={toggleTheme} />
            )}
        </>
    );
}

export default ThemeToggler;
