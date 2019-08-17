import React, {Component} from 'react';
import './index.css';


class Player extends Component {

  render() {
    let song = this.props.mp3;
  return (
    <div className="player">
      <audio src={song} autoplay="true" hidden="hidden" controls>
      </audio>
    </div>
  );
}
}

export default Player;
