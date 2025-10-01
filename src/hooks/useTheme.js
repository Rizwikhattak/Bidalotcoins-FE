import { useEffect, useState } from "react";
import { APP_CONSTANTS } from "../utils/Constants";

export function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem(APP_CONSTANTS.GLOBAL_THEME) ||
      APP_CONSTANTS.LIGHT_THEME
  );
  useEffect(() => {
    if (theme === APP_CONSTANTS.DARK_THEME)
      document.documentElement.classList.add(APP_CONSTANTS.DARK_THEME);
    else document.documentElement.classList.remove(APP_CONSTANTS.DARK_THEME);

    localStorage.setItem(APP_CONSTANTS.GLOBAL_THEME, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === APP_CONSTANTS.LIGHT_THEME
        ? APP_CONSTANTS.DARK_THEME
        : APP_CONSTANTS.LIGHT_THEME
    );
  return { theme, toggleTheme };
}
