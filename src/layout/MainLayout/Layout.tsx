import React from 'react';
import './Layout.css';
import Header from '../header/header';
import Footer from '../footer/Footer';
import AsideR from '../asideR/asideR';
import AsideL from '../asideL/asideL';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content">
       <AsideL /> 
        <main className="main">
          
          {/* Your main content here */}
        </main>
        <AsideR />
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default Layout;
