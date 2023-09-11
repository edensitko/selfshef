import useTheme from '../../pages/hooks/useTheme'
import './themeSelector.css'
import React from 'react'
import icon from '../../assets/mode.svg'
import { Filter } from '@mui/icons-material';

const themeColors = ['gray','black','red', 'blue' ];



export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
    const toggleMode =()=>{
      changeMode(mode==='dark'?'light':'dark')

    }
console.log(mode)
    return (

        <div className='theme-selector'>
          <div className='mode-toggle'>

<img src={icon} alt="dark/light icon" onClick={toggleMode}
style={{filter:mode ==='dark' ? 'invert(100%)' : 'invert(20%)'}}

/>

          </div>

        <div className='theme-buttons'>
          {themeColors.map((color) => (
            <div
              key={color}
              onClick={() => changeColor(color)}
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </div>
  )
}
