import { useContext } from "react";
import { ThemeContext } from "../../pages/context/themeContext"; // Adjust the import path as needed

type ThemeContextType = {
  color: string;
  changeColor: (color: string) => void;
  changeMode: (mode: string) => void;
  mode: string;
};
  function useTheme(): ThemeContextType {
    const Context = useContext(ThemeContext);

  if (!Context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return Context;

}

export default useTheme;
