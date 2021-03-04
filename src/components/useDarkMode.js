import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  //   const [componentMounted, setComponentMounted] = useState(false);

  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
    // setComponentMounted(true);
  }, []);

  return [theme, toggleTheme];
};
