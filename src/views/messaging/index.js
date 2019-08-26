import React, {Component} from 'react';
import './index.css';
import Display from '../../components/display'
import Input from '../../components/input'


class Messaging extends Component {
  constructor( props ) {
    super();

    this.state = {
      'message': []
    }
    props.toggleHeader();
    props.toggleSongs();
  }

  sendMessage = async(e) => {
    e.preventDefault()

    let message = e.target.elements.message.value;

    const messages = this.state.message

    messages.push({
      'text': message,
      'username': 'jonm23'
    })
    // set the state
    this.setState({ 'message': messages });

  }

  render() {
  return (
    <div className="messaging">
      <Display message={this.state.message}/>
      <Input sendMessage={this.sendMessage}/>
    </div>
  );
}
}

export default Messaging;
