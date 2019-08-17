import React, {Component} from 'react';
import './App.css';
import Button from './components/button';
import Player from './components/player';
// import Gif from './components/gif';
import audio_wave from './audio_wave.jpg';
// import myvideo from './background_video.mp4';



class Play extends Component {

  constructor() {
    super();

    this.state = {
    'list': [],
    'mp3': ''

    }
  }

  getData = async() => {

    //Grabbing top 100 list from own API
    let URL = 'http://127.0.0.1:5000/api/retrieve';
    let response = await fetch(URL);
    let data = await response.json();
    data = data.Success.data

    //set the state for the data
    this.setState({ 'list': data }) // Just for testing do not need this

    //send artist names to match song.
    let num = 0;  //just for testing purposes
    let song_name = '';
    let song_artist = '';

    //take song name and artist
    for (let i in data) {
      if (num == i){
      song_artist = data[i]['artist'];
      song_name = data[i]['title'];
     }
    }

    //call api to search for artist to get song ID.
    let URL2 = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=lilnasx';
    let response2 = await fetch(URL2, {
      'method': 'GET',
      'headers': {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': '3729b97328mshfcb5cfb5509009dp148095jsn23f0793b86d9',
      }
    });
    let data2 = await response2.json();
    data2 = data2.data; //data2 is the artists songs

    //check if song is in artists, if so take song ID
    let song_id = 0;
    for (let j in data2) {
      if (song_name == data2[j]['title']) {
      song_id = data2[j]['id'];
      console.log(song_id);
      break;
    }
    }

    //send song id in track api to get song mp3 file
    let song_file = '';
    let URL3 = `https://deezerdevs-deezer.p.rapidapi.com/track/${song_id}`;
    let response4 = await fetch(URL3, {
      'method': 'GET',
      'headers': {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': '3729b97328mshfcb5cfb5509009dp148095jsn23f0793b86d9',
      }
    });
    let data3 = await response4.json();
    song_file = data3.preview;

    //set the state for song mp3 file
    this.setState({ 'mp3': song_file });

    //Removesong out of the state //for later after testing
    // for (let t in data) {
    //   if (data[t]['title'] == song_name) {
    //
    //   }
    // }
  }
//set the state too many times change this
  render() {
  return (
    <div className="player">

      {/*<video autoplay muted loop id="myvideo">
        <source src={myvideo} type='video/mp4' />
      </video>*/}
      <header className="header">
        <h1 className="heading">Top 100 Songs</h1>
      </header>
      <main>

        <div className="main">
          <Button getData={this.getData} />
        </div>

        <div>
          <Player mp3={this.state.mp3}/>
        </div>

        <div>
          <img src={audio_wave}></img>
        </div>


      </main>
    </div>
  );
}
}

export default Player;
