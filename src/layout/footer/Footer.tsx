import React from 'react';
import './Footer.css'; // You can add your footer styles here

const Footer: React.FC = () => {
  return (
    <footer className="footer p-1 text-center bg-zinc-800	 text-white">
    
      <p>&copy; {new Date().getFullYear()}  All rights reserved to eden sitkovetsky. </p>
    </footer>
  );
};

export default Footer;
