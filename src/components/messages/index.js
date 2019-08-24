import React from 'react';
import './index.css';
import Message from '../message';

function Messages(props) {

  return (
      <ul className="messages-ul">
      {
        props.message &&
          props.message.map(m =>
            <Message
            message={m}
            />
          )
      }
      </ul>
  );
}


export default Messages;
