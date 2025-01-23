import { createContext } from "react";
import { ThemeType } from "src/types.global";

export const themeContext = createContext<ThemeType>("light");
