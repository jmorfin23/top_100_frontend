import React from 'react';
import './index.css';


function Input() {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2 input">
        <div className="form-group">
          <input type="text" className="form-control" name="message" placeholder="Send a message!" />
        </div>
      </div>
    </div>
  );
}

export default Input;
