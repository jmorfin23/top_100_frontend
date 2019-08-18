import React from 'react';
import './index.css';
import Messages from '../messages'

//this will display messages

function Display() {
  return (
      <div className="row">
        <div className="col-md-8 offset-md-2 display">
          <Messages />
        </div>
      </div>
  );
}

export default Display;
