import React from 'react';
import './index.css';

class Popup extends React.Component {
  render() {
return (
    <div className='popup'>
      <div className='popup\_inner'>
        <h1>Instructions:</h1>
          <p>Welcome! The purpose of this game is to guess the rankings of the songs currently on the BillBoard Top 100 Charts. To play the game press 'Play'. You have 3 guesses for each song. The closer you get to the actual ranking the more points you get!</p>
          <p className="make-bold">Good Luck!</p>
          <button className="btn btn-danger" onClick={this.props.closePopup}>Close</button>
      </div>
    </div>
    );
  }
}

export default Popup;
