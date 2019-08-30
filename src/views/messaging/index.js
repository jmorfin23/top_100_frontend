import React, {Component} from "react";
import './index.css';
import DisplayMessage from "../../components/displayMessage";
import Input from "../../components/input"

class Messaging extends Component {


  constructor(props) {
    super();


    let members = []

    this.state = {
      messages: [],
      member: {
        username: 'jonsmith',
        color: 'red',
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
      console.log('Successfully connected to Scaledrone');

      const member = {...this.state.member};
      const messages = this.state.messages;

      member.id = this.drone.clientId;

      const room = this.drone.subscribe("observable-room");
      
      room.on('data', (data, member) => {
        messages.push({member, text: data});
        this.setState({messages});
      });
      this.setState({member});



      room.on('open', error => {
        if (error) {
          return console.error(error);
        }
        console.log('Successfully joined room');

        // List of currently online members, emitted once
        room.on('members', m => {
         members = m;
         // updateMembersDOM(); uncomment later
        });

        // User joined the room
        room.on('member_join', member => {
         members.push(member);
         // updateMembersDOM(); uncomment later
        });

        // User left the room
        room.on('member_leave', ({id}) => {
          console.log('insidemembers leave ');
         const index = members.findIndex(member => member.id === id);
         members.splice(index, 1);
         // updateMembersDOM(); uncomment later
        });
        // Add this after 'member_leave' event
        room.on('data', (text, member) => {
          console.log('inside room . on data lask');
         if (member) {
           // addMessageToListDOM(text, member); uncomment later
         } else {
           // Message is from server
         }
        });
      });


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
