import { colors } from "@mui/material";
import React, { createContext, ReactNode, useReducer } from "react";
import icon from '../../assets/mode.svg'


type Theme = {
  color: string;
  mode:string;

  
};

type Action = {
    type: string;
    payload?: any;
  };

  
  export const ThemeContext = createContext<{ color: string; mode: string; // Include mode in the context type
  changeMode: (mode: string) => void;
 changeColor: (color: string) => void } | undefined>(undefined);
 
  type ThemeProviderProps = {
    children: ReactNode;
  };
  
  const themeReducer = (state: Theme, action: Action): Theme => {
    switch (action.type) {
      case "CHANGE_COLOR":
        return { ...state, color: action.payload };
        case 'CHANGE_MODE':
            return{ ...state , mode :action.payload}
      default:
        return state;

    }
  };


function ThemeProvider({ children }: ThemeProviderProps) {
const [state , dispatch] = useReducer(themeReducer ,{
    color :'grey',
    mode : 'dark',
})

const changeColor = (color: string) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };


  const changeMode = (mode:string)=>{
    dispatch ({type : 'CHANGE_MODE',payload: mode})

  }
  return (
    <ThemeContext.Provider value={{ ...state, changeColor,changeMode}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;


