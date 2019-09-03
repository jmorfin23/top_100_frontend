import React from 'react';
import './index.css';
import SongItem from '../songitem';



//this will display messages
function SongTable(props) {

  return (
          <table className="table table-striped table-dark table-hover extra-margin-top">
          <thead className="thead-dark centered">
            <tr>
              <th>Rank</th>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Art</th>
            </tr>
          </thead>
          <tbody className="centered">
          {
            props.song_list &&
              props.song_list.map( (song, index) =>
                <SongItem
                  song={song}
                  index={parseInt(index) + 1}
                  key={index}
                />
              )
          }
          </tbody>
          </table>
  );

}

export default SongTable;
