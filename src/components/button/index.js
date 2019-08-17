import React from 'react';
import './index.css';


function Button(props) {
  return (
      <button onClick={props.getData} className="btn btn-danger">Play</button>
  );
}

export default Button;
