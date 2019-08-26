import React from 'react';
import './index.css';
import {NavLink} from 'react-router-dom';


function Header(props) {
  return (
    <header className="Header">
      <nav className="mynav navbar-black bg-black">
        <NavLink to='/' className="add-padding navbar-brand" id="extra-margin-left">Play</NavLink>
        <span id="total"><p>Points: {props.points}</p></span>
        {
          props.toggle &&
            <NavLink to='/messaging' className="add-padding navbar-brand" id="float-right">Messaging</NavLink>
        }
        {
          !props.toggle_songs_tab &&
          <NavLink to='/songs' className="add-padding navbar-brand" id="float-right">Songs</NavLink>
        }
      </nav>
    </header>
  );

}

export default Header;
