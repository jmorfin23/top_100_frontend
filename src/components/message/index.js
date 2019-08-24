import React from 'react';
import './index.css';


function Message(props) {
console.log(props.message);
  return (
      <li className="message">
      <span className="avatar" />
        <div className="username">{props.message.username}</div>
        <div className="text">{props.message.text}</div>
      </li>

  );
}


export default Message;
