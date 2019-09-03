import React from 'react';
import './index.css';

class LogoutPopup extends React.Component {
  render() {
return (
    <div className='popup'>
      <div className='popup\_inner'>
        <h1>Logout:</h1>

          <p className="make-bold">Are you sure you want to logout?</p>
          <button className="btn btn-danger" onClick={this.props.logoutUser}>Yes</button>
          <button className="btn btn-danger" onClick={this.props.closelogoutPopup}>No</button>
      </div>
    </div>
    );
  }
}

export default LogoutPopup;
