import './header.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useTheme from '../../pages/hooks/useTheme';


const Header: React.FC = () => {
  const { color, changeColor } = useTheme();

  return ( 

 <div className="nav ">
    <header className="justify-between t-0 flex items-center p-5" style={{ background:color }}>
            <Link to="/" className='text-white text-3xl'>selfChef</Link>     
        <Link to="/create" className='create text-white text-sm border cursor-pointer rounded-full p-4 border-white'>create recipe </Link>
 
          
       
  
 
    </header>
    </div>

    
  );
};

export default Header;
