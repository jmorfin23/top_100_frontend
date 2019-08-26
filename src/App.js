import React, {Component} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Messaging from './views/messaging';
import Play from './views/play';
import Header from './components/header';
import Songs from './views/songs';


class App extends Component {
  constructor() {
    super();

    this.state = {
      'toggle': false,
      'toggle_songs_tab': false,
      'points': 0
    }
  }
  updateState = async(points) => {
    points = this.state.points += points
    this.setState({'points': points})
    return;
  }

  toggleSongs = async() => {
    this.setState({ 'toggle_songs_tab': !this.state.toggle_songs_tab })
  }
  
  toggleHeader = async() => {
    this.setState({ 'toggle': !this.state.toggle })
  }

  render() {
  return (
    <div className="App">
      <Header toggle_songs_tab={this.state.toggle_songs_tab} toggle={this.state.toggle} points={this.state.points}/>
      <Switch>
        <Route exact path='/' render={() => <Play toggleSongs={this.toggleSongs} toggleHeader={this.toggleHeader} updateState={this.updateState} points={this.state.points}/>} />
        <Route exact path='/messaging' render={() => <Messaging toggleSongs={this.toggleSongs} toggleHeader={this.toggleHeader} />}/>
        <Route exact path='/songs' render={() => <Songs toggleHeader={this.toggleHeader} toggleSongs={this.toggleSongs} />}/>
      </Switch>
    </div>
  );
}
}

export default App;
