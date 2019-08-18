import React, {Component} from 'react';
import './index.css';


class Player extends Component {

  // function playSong() {
  //   console.log('inside play song');
  // }
  //
  // function pauseSong() {
  //   console.log('inside pause song');
  // }


  render() {
    let song = this.props.mp3;
  return (
    <div className="player">
      <audio id="audio" src={song} autoPlay={true} hidden="hidden" controls>
      </audio>
    </div>
  );
}
}

export default Player;
