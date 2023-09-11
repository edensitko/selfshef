import React from 'react';
import './Layout.css';
import Header from '../header/header';
import Footer from '../footer/Footer';
import Routing from '../Routing/Routing';
import ThemeSelector from '../themeSelector.tsx/themeSelector';
import useTheme from '../../pages/hooks/useTheme';
import '../../tailwind.css';

const Layout: React.FC = () => {
  const {mode}=useTheme()
  return (
    <div className="layout">
      <Header /> 
        <main className={`main ${mode}`}>
          <ThemeSelector/> 
           <Routing/>
       </main>
      <Footer /> 
    </div>
  );
};

export default Layout;
