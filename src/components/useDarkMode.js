import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  const setMode = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
  }, []);

  return [theme, toggleTheme];
};
