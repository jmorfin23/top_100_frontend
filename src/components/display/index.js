import React, {Component} from 'react';
import './index.css';
import Messages from '../messages'

//this will display messages

class Display extends Component {
  constructor() {
    super();

    this.state = {
      'text': 'This is  test message hahah'
    }
  }

  render() {

  return (
      <div className="row">
        <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-10 offset-1 display">
          <Messages message={this.props.message}/>
        </div>
      </div>
  );
}
}

export default Display;
