import React from 'react';
import './index.css';
import {NavLink} from 'react-router-dom';


function Header(props) {

  console.log(props);
  return (
    <header className="Header">
      <nav className="mynav navbar-black bg-black">
        {
          !props.logged_in &&
            <>
            <NavLink to='/login' className="add-padding navbar-brand" id="extra-margin-left">Login</NavLink>
            <NavLink to='/register' className="add-padding navbar-brand" id="float-right">Register</NavLink>
            </>
        }
        {
          (props.toggle == 1  && props.logged_in) &&
            <>
            <NavLink to='/play' className="add-padding navbar-brand" id="extra-margin-left">Play</NavLink>
            <span id="total"><p>Points: {props.points}</p></span>
            <NavLink to='/messaging' className="add-padding navbar-brand" id="float-right">Messaging</NavLink>
            </>
        }
        {
          (props.toggle == 2 && props.logged_in) &&
          <>
            <NavLink to='/play' className="add-padding navbar-brand" id="extra-margin-left">Play</NavLink>

            <NavLink to='/songs' className="add-padding navbar-brand" id="float-right">Songs</NavLink>
          </>
        }
        {
          (props.toggle == 3 && props.logged_in) &&
            <NavLink to='/messaging' className="add-padding navbar-brand">Messaging</NavLink>
        }
      </nav>
    </header>
  );

}

export default Header;
