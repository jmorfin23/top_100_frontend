import React from 'react';
import './index.css';


function Input(props) {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2 input">
        <form onSubmit={props.sendMessage}>
          <div className="form-group one">
            <input type="text" className="form-control" name="message" placeholder="Send a message!" />
          </div>
          <div className="two">
            <button type="submit" className="btn btn-primary" name="notes">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Input;
