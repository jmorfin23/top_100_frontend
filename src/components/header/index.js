import React from 'react';
import './index.css';
import {NavLink} from 'react-router-dom';


function Header(props) {
  return (
    <header className="Header">
      <nav className="mynav navbar-black bg-black">
        {
          props.toggle == 1 &&
            <>
            <NavLink to='/' className="add-padding navbar-brand" id="extra-margin-left">Play</NavLink>
            <span id="total"><p>Points: {props.points}</p></span>
            <NavLink to='/messaging' className="add-padding navbar-brand" id="float-right">Messaging</NavLink>
            </>
        }
        {
          props.toggle == 2 &&
          <>
            <NavLink to='/' className="add-padding navbar-brand" id="extra-margin-left">Play</NavLink>
          
            <NavLink to='/songs' className="add-padding navbar-brand" id="float-right">Songs</NavLink>
          </>
        }
        {
          props.toggle == 3 &&
            <NavLink to='/messaging' className="add-padding navbar-brand" id="float-left">Messaging</NavLink>
        }
      </nav>
    </header>
  );

}

export default Header;
