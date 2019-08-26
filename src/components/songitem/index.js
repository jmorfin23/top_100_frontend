import React from 'react';
import './index.css';


function SongItem(props) {

  return (
      <tr>
        <td>{props.index}</td>
        <td>{props.song.title}</td>
        <td>{props.song.artist}</td>
      </tr>
  );

}

export default SongItem;
