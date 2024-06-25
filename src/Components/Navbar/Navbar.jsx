import React from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    
      <div className='navbar'>
      <Link to='/' style={{textDecoration:'none'}}>
      <p>Bot AI</p>
      </Link>
        
    </div>
  );
}

export default Navbar;
