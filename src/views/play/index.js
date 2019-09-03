import React, {Component} from 'react';
import './index.css';
import Button from '../../components/button';
import Player from '../../components/player';
// import Gif from './components/gif';
import audio_wave from '../../audio_wave.jpg';
// import myvideo from './background_video.mp4';
// import myvideo from '../../sample.mp4';
import Form from '../../components/form';
import Popup from '../../components/popup';
import LogoutPopup from '../../components/logoutPopup';



class Play extends Component {

  constructor( props ) {
    super();

    this.increment = 0;

    this.state = {
    showPopup: false,
    showLogout: false,
    'mp3': '',
    'song': {artist: '', title: ''},
    'song_rank': 0,
    'number_of_guesses': 0
    };

    props.toggleHeader(1);
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }
  toggleLogout() {
    this.setState({ showLogout: !this.state.showLogout });
  }

  checkArtist = (song_artist) => {
    //Regexing for &, Featuring, and ','
    if (song_artist.includes(',') ) {
      return song_artist.split(',');
    } else if (song_artist.includes('Featuring')) {
      return song_artist.split('Featuring');
    } else if (song_artist.includes('featuring')) {
      return song_artist.split('featuring');
    } else if (song_artist.includes('&')) {
      return song_artist.split('&');
    }
  }
  checkParenthesee = (song_name) => {
    //check if song includes '('
    if (song_name.includes('(')) {
      console.log('inside (');
      song_name = song_name.split('(');
      return song_name[0].trim();
    }
    return song_name;
  }
  checkApostrophes = (song_name) => {
    console.log('inside check apostrophes');
    for (let u in song_name) {
      if (song_name[u] == "'" | song_name[u] == "`" | song_name[u] == "’") {
        return song_name.replace(song_name[u], '');
    }
    }
    return song_name;
  }
  compareSongs = (song_name, song_from_api__filtered, song_from_api__short_title) => {
    if (song_name.toLowerCase() == song_from_api__filtered.toLowerCase() | song_name.toLowerCase() == song_from_api__short_title.toLowerCase()) {
      return true;
    }
    return false;
  }

  compareSongs2 = (song_name, song_from_api__filtered, song_from_api__short_title, song_artist, artist_from_api) => {
    console.log('inside compare songs 2');
    if (song_name.toLowerCase() == song_from_api__filtered.toLowerCase() | song_name.toLowerCase() == song_from_api__short_title.toLowerCase()) {
      if (song_artist == artist_from_api) {
        console.log(`${song_artist} is equal to ${artist_from_api}`);
        return true;
      }
    }
    return false;
  }
  //issues with songs 77
  getData = async() => {

    //Grab top 100 list from own API in routes.py
    let URL = 'http://localhost:5000/api/retrieve';
    let response = await fetch(URL);
    let data = await response.json();
    //set the state for the data
    this.setState({ 'list': data.Success })
    console.log(this.state.list);

    //send artist / song names to match song
    let song_name = '';
    let song_artist = '';
    let regexd_song_artist = '';
    let random_num = Math.ceil(Math.random() * 99)

    console.log(random_num);
    //set state for song rank

    //take song name and artist
    for (let i in this.state.list) {
      if (random_num == i){
        song_artist = this.state.list[i]['artist'].trim();
        song_name = this.state.list[i]['title'].trim();
        //set the state for song and artist for guessing
        this.setState({ 'song': { artist: song_artist, title: song_name}})
        this.setState({ 'song_rank': this.state.list[i]['rank']})
     }
    }

    //an issue with the song name 'Ran$om' because of the $ this takes care of it.
    if (song_name == 'Ran$om' | song_name == 'ran$om') {
      song_name = 'Ransom'
    }

    console.log(song_artist);
    console.log(song_name);

    regexd_song_artist = this.checkArtist(song_artist);
    console.log(regexd_song_artist);
    //call api to search for artist to get song ID.
    let URL2 = '';
    if (regexd_song_artist) {
      URL2 = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${regexd_song_artist[0]}`;
      console.log('***** inside regexed song artist *****');
      song_artist = regexd_song_artist[0].trim();
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
    console.log(data2);
    console.log(song_artist + 'test');
    let song_file = '';
    let song_from_api__filtered = ''
    //check if song name includes parenthesees
    song_name = this.checkParenthesee(song_name);

    //checking apostrophes in song name.
    song_name = this.checkApostrophes(song_name);


    for (let j in data2) {
      //check if parenthesees are in songname from api
      song_from_api__filtered = this.checkParenthesee(data2[j]['title']);
      //check if apostrophes are in songname from api
      song_from_api__filtered = this.checkApostrophes(song_from_api__filtered);

      //take short title:

      let song_from_api__short_title = this.checkParenthesee(data2[j]['title_short']);

      song_from_api__short_title = this.checkApostrophes(data2[j]['title_short']);

      let result = this.compareSongs(song_name, song_from_api__filtered, song_from_api__short_title);

      //take songfile if songs are equal
      if (result) {
        console.log(song_artist);
        console.log('Success, song file aquired');
        console.log(song_name + ' by ' + song_artist + " is equal to " + song_from_api__filtered + " by " + data2[j]['artist']['name'] );
        this.setState({ 'mp3': data2[j]['preview'] });
        break;
      }
  }

    if (!(this.state.mp3)) {
      console.log('** song file was not aquired by the artist api sending to the song search api **');

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
      console.log(data3);
      for (let i in data3) {

        let song_from_api__filtered = this.checkParenthesee(data3[i]['title']);

        song_from_api__filtered = this.checkApostrophes(song_from_api__filtered);

        let song_from_api__short_title = this.checkParenthesee(data3[i]['title_short']);

        song_from_api__short_title = this.checkApostrophes(data3[i]['title_short']);

        let result = this.compareSongs2(song_name, song_from_api__filtered, song_from_api__short_title, song_artist, data3[i]['artist']['name']);

        if (result) {
          console.log('Success, song file aquired in search song');
          console.log(song_name + ' by ' + song_artist + " is equal to " + song_from_api__filtered + " by " + data2[i]['artist']['name'] );
          this.setState({ 'mp3': data3[i]['preview'] });
          break;
        }
      }
    }
    //set song state if song_artist name was regexed or not
    // if (regexd_song_artist) {
    //   this.setState({ 'song': { artist: regexd_song_artist[0], title: song_name}})
    // } else {
    //   this.setState({ 'song': { artist: song_artist, title: song_name}})
    // }
    console.log(this.state.song);
    this.increment = 0;
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
    console.log(this.increment + ' is increment');
    let guess = e.target.elements.ranking.value

    if (this.increment >= 4) {
       alert('Press Play to hear a new song, you\'ve exhausted all your guesses or already answered correctly.');
       return;
     }

    if (guess == this.state.song_rank) {
      alert(`You answered correctly! You gained 100 points! The song, ${this.state.song.title} by ${this.state.song.artist} is rank  ${this.state.song_rank} on the Billboard Charts. Press 'Play' to hear a new song.`);
      this.props.updatePoints(100);
      this.increment = 3;
      return;
    } else {
      let closeness = Math.abs(guess - this.state.song_rank)
      if (closeness <= 5) {
        alert('You guessed within 5 ranks away, you gain 20 points!');
        this.props.updatePoints(20)
      } else if (closeness <= 10) {
        alert('You guessed within 10 ranks away, you gain 5 points!');
        this.props.updatePoints(5)
      } else {
          let msg = ''
          guess > this.state.song_rank ? msg = 'Your guess is greater than the songs rank. ' : msg = 'Your guess is less than the songs rank.'
          alert(`Sorry, you are not even close. ${msg} Guess again.`);
        }
        if (this.increment >= 3) {
          alert(`You've use all of your guesses. The song, ${this.state.song.title} by ${this.state.song.artist} is rank ${this.state.song_rank} on the Billboard Charts.`);
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
              <a onClick={this.togglePopup.bind(this)} id='info'>&#9432;</a>
              <a onClick={this.toggleLogout.bind(this)} id='logout'><i className="fa fa-sign-out" aria-hidden="true"></i></a>
              {this.state.showPopup ?
              <Popup closePopup={this.togglePopup.bind(this)} /> : null
              }
              {this.state.showLogout ?
                <LogoutPopup closelogoutPopup={this.toggleLogout.bind(this)} logoutUser={this.props.logoutUser}/> : null
              }
            </div> {/* end of row */}
          </div> {/* end of col */}
        </div> {/* end of row */}
      </div> //end of player

    // </div>
  );
}
}

export default Play;
