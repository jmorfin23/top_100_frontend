import React, {Component} from 'react';
import './index.css';
import Button from '../../components/button';
import Player from '../../components/player';
// import Gif from './components/gif';
import audio_wave from '../../audio_wave.jpg';
// import myvideo from './background_video.mp4';
// import myvideo from '../../sample.mp4';
import Form from '../../components/form';

class Play extends Component {


  constructor() {
    super();

    this.increment = 0;

    this.state = {
    'mp3': '',
    'song': {artist: '', title: ''},
    'song_rank': 0,
    'number_of_guesses': 0
    }
  }

  getData = async() => {

    //Grab top 100 list from own API in routes.py
    let URL = 'http://127.0.0.1:5000/api/retrieve';
    let response = await fetch(URL);
    let data = await response.json();
    data = data.Success.data
    console.log(data);
    //set the state for the data
    this.setState({ 'list': data })

    //send artist / song names to match song
    let song_name = '';
    let song_artist = '';
    let regexd_song_artist = '';
    let random_num = Math.floor(Math.random() * 99)

    console.log(random_num);
    //set state for song rank
    this.setState({ 'song_rank': random_num + 1})

    //take song name and artist
    for (let i in data) {
      if (random_num == i){

      song_artist = data[i]['artist'];
      song_name = data[i]['title'];
     }
    }
    //an issue with the song name 'Ran$om' because of the $ this takes care of it.
    if (song_name == 'Ran$om' | song_name == 'ran$om') {
      song_name = 'Ransom'
    }
    console.log(song_artist);
    console.log(song_name);

    //Regexing for &, Featuring, and ','
    if (song_artist.includes(',') ) {
      regexd_song_artist = song_artist.split(',');
    } else if (song_artist.includes('Featuring')) {
      regexd_song_artist = song_artist.split('Featuring');
    } else if (song_artist.includes('featuring')) {
      regexd_song_artist = song_artist.split('featuring');
    } else if (song_artist.includes('&')) {
      regexd_song_artist = song_artist.split('&');
    }

    // //call api to search for artist to get song ID.
    let URL2 = '';
    if (regexd_song_artist) {
      URL2 = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${regexd_song_artist[0]}`;
  } else {
    URL2 = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${song_artist}`;
  }

    let response2 = await fetch(URL2, {
      'method': 'GET',
      'headers': {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': '3729b97328mshfcb5cfb5509009dp148095jsn23f0793b86d9',
      }
    });
    let data2 = await response2.json();
    data2 = data2.data; //data2 is the artists songs

    let song_file = '';
    // //check if song is in artists, if so take song ID
    for (let j in data2) {
      if (song_name.toLowerCase() == data2[j]['title'].toLowerCase() | song_name.toLowerCase() == data2[j]['title_short'].toLowerCase()) {
        song_file = data2[j]['preview'];
      break;
    }
    }
    if (song_file) {
      this.setState({ 'mp3': song_file });
    } else {

      let URL3 = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${song_name}`;
      let response2 = await fetch(URL3, {
        'method': 'GET',
        'headers': {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '3729b97328mshfcb5cfb5509009dp148095jsn23f0793b86d9',
        }
      });

      let data3 = await response2.json();
      data3 = data3.data; //data3 is the artists songs

      for (let i in data3) {
        if (data3[i]['title'].toLowerCase() == song_name.toLowerCase() | data3[i]['title_short'].toLowerCase() == song_name.toLowerCase()) {
          song_file = data3[i]['preview'];

          //set the state for song mp3 file, and song
          this.setState({ 'mp3': song_file });
          break;
        }
      }
    }
    //set song state if song_artist name was regexed or not
    if (regexd_song_artist) {
      this.setState({ 'song': { artist: regexd_song_artist[0], title: song_name}})
    } else {
      this.setState({ 'song': { artist: song_artist, title: song_name}})
    }
    console.log(this.state.song);
    console.log(this.state.mp3);
    //////********************************////////////

  }


  guessRanking = async(e) => {
    e.preventDefault()
    if (this.state.song_rank == 0) {
      alert("Press 'Play' then guess the song rank!")
      return;
    }
    this.increment = this.increment += 1
    //check number of guess user has made for a one song
    this.setState({ 'number_of_guesses': this.increment})

    let guess = e.target.elements.ranking.value

    if (guess == this.state.song_rank) {
      alert('You answered correctly! You gained 100 points!');
      this.props.updateState(100)
    } else {
      let closeness = Math.abs(guess - this.state.song_rank)
      if (closeness <= 5) {
        alert('You guessed within 5 ranks away, you gain 20 points!');
        this.props.updateState(20)
      } else if (closeness <= 10) {
        alert('You guessed within 10 ranks away, you gain 5 points!');
        this.props.updateState(50)
      } else {
        if (this.increment == 3) {
          alert(`You've ran out of guesses. The song, ${this.state.song.title} by ${this.state.song.artist} is rank  ${this.state.song_rank} on the Billboard Charts. You gain 0 points.`);
        } else {
          alert(`Sorry, you are not even close. Guess again.`);
        }
      }
    }
  }

  render() {
  return (
    <div className="player">

  {/*<div className='video'>
    <video id="background-video" loop autoPlay>
      <source src={myvideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>*/}

      {/*<video autoplay muted loop id="myvideo">
        <source src={myvideo} type='video/mp4' />
      </video>*/}
      {/*<div className="outer-container">*/}

        <div className="header">
          <h1 className="heading">Top 100 Songs</h1>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4 col-lg-6 offset-lg-3">
            <div className="main">
              <Button getData={this.getData} />
            </div>
            <div>
              <Player mp3={this.state.mp3}/>
            </div>
            <div>
              <img src={audio_wave} alt='aesthetic'></img>
            </div>
            <div className="row relative">
              <div className="col-md-4 offset-md-4 col-sm-4 offset-sm-4 col-4 offset-4">
              <Form guessRanking={this.guessRanking}/>
              </div>
              <p id='info'>&#9432;</p>
            </div> {/* end of row */}
          </div> {/* end of col */}
        </div> {/* end of row */}
      </div> //end of player

    // </div>
  );
}
}

export default Play;
