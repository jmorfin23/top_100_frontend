import React from 'react';
import './index.css';


function Input(props) {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-10 offset-1 input">
        <form onSubmit={props.sendMessage}>
          <div className="form-group one">
            <input type="text" className="form-control" name="message" placeholder="Send a message!" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Input;
