import React, {Component} from "react";
import './index.css';
import DisplayMessage from "../../components/displayMessage";
import Input from "../../components/input"

class Messaging extends Component {
  constructor(props) {
    super();


    this.state = {
      messages: [],
      member: {
        username: 'jonsmith',
        color: 'red',
        id: 0
      }
    }  
    props.toggleHeader(2);

    this.drone = new window.Scaledrone("1QKwbjduKYTesXml", {
      data: this.state.member
      });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      console.log('test');
      console.log(member + 'this is a test!');
      member.id = this.drone.clientId;

      this.setState({member});
    });


    const room = this.drone.subscribe("observable-room");

    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });


  }

  onSendMessage = (message) => {
    this.drone.publish({
    room: "observable-room",
    message
    });

  }
  render() {
    return (

      <div className="App">
        <DisplayMessage
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
         onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }
}

export default Messaging;
