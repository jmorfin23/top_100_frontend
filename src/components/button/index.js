import React from 'react';
import './index.css';


function Button(props) {
  return (
      <div className='button'>
      <button onClick={props.getData} className="btn btn-danger">Play</button>
      </div>
  );
}

export default Button;
