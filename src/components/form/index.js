import React from 'react';
import './index.css';


function Form(props) {
  return (
    <div className="form">
    <form onSubmit={props.guessRanking}>
      <div className="form-group">
        <input type="number" className="form-control" name="ranking" placeholder="Guess song rank" />
      </div>
    </form>
    </div>
  );
}

export default Form;
