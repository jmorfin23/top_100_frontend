import React from 'react';
import './index.css';


function Form(props) {
  return (
    <div className="form">
    <form onSubmit={props.getRanking}>
      <div className="form-group">
        <label></label>
        <input type="number" className="form-control" name="ranking" placeholder="Guess the song ranking." />
      </div>
      <button type="submit" className="btn btn-primary" name="sumbit">Go!</button>
    </form>
    </div>
  );
}

export default Form;
