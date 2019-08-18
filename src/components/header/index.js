import React from 'react';
import './index.css';
import {NavLink} from 'react-router-dom';


function Header() {
  return (
    <header className="Header">
      <nav className="navbar navbar-black bg-black">
        <NavLink to='/' className="navbar-brand">Play</NavLink>
        <NavLink to='/messaging' className="navbar-brand">Messaging</NavLink>
      </nav>
    </header>
  );

}

export default Header;
