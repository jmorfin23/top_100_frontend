import React, {Component} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Messaging from './views/messaging';
import Play from './views/play';
import Header from './components/header';

class App extends Component {
  constructor() {
    super();

    this.state = {
      'points': 0
    }
  }
  updateState = async(points) => {
    points = this.state.points += points
    this.setState({'points': points})
    return;
  }

  render() {
  return (
    <div className="App">
      <Header points={this.state.points}/>
      <Switch>
        <Route exact path='/' render={() => <Play updateState={this.updateState} points={this.state.points}/>} />
        <Route exact path='/messaging' render={() => <Messaging />}/>
      </Switch>
    </div>
  );
}
}

export default App;
