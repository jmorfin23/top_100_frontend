import React, {Component} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Messaging from './views/messaging';
import Play from './views/play';
import Header from './components/header';

class App extends Component {
  render() {
  return (
    <div className="App">
      <Header /> 
      <Switch>
        <Route exact path='/' render={() => <Play />} />
        <Route exact path='/messaging' render={() => <Messaging />}/>
      </Switch>
    </div>
  );
}
}

export default App;
