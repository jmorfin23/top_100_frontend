import React, {Component} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Messaging from './views/messaging';
import Play from './views/play';
import Header from './components/header';
import Songs from './views/songs';
import Login from './views/login';
import Register from './views/register'
import {withRouter} from 'react-router-dom';
import SECRET_KEY from './config.js';
let jwt = require('jsonwebtoken');

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged_in: false,
      'toggle': 0,
      'points': 0,
      'username': ''
    }
  }


  updatePoints = async(points) => {
    points = this.state.points += points
    this.setState({'points': points})

    const URL = 'http://localhost:5000/update/points';
    console.log(this.state.points);

    let response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'points': this.state.points,
        'username': this.state.username
      }
    });
    let data = await response.json();
    console.log(data);
    return;
  }

  toggleHeader = async(num) => {
    console.log(num);
    this.setState({ 'toggle': num })
  }

  logoutUser = async() => {
    alert('Come back soon!')
    this.setState({ logged_in: !this.state.logged_in })
    this.props.history.push('/login');
  }

  handleLogin = async(e) => {
    e.preventDefault();
    console.log('inside handle login');

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = 'http://localhost:5000/api/login';

    // encrypt a token with the proper payload info to send to our api
    let token = jwt.sign(
      { 'email': email, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' } // expires in 1 hour
    );

    // send the token to register the user
    let response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      }
    });

    let data = await response.json();

    // setup message saying registered or error
    if (data.message === 'success') {
      this.setState({ logged_in: true });
      this.setState({ 'points': data.points})
      this.setState({ 'username': data.username})
      // set the token we receive into local storage
      localStorage.setItem('token', data.token);

      alert('You are now logged in!');

      //pushes the user to the 'play' page
      this.props.history.push('/play');
    } else {
      alert(data.message);
    }

  }

  handleRegister = async(e) => {
    e.preventDefault();
    console.log('inside handle register');

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;
    let username = e.target.elements.username.value;

    const URL = 'http://localhost:5000/api/register';

    // encrypt a token with the proper payload info to send to our api

    let token = jwt.sign(
      { 'email': email, 'username': username, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' } // expires in 1 hour
    );

    // send the token to register the user
    let response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      }
    });

    let data = await response.json();
    console.log(data);
    // setup message saying registered or error
    if (data.message === 'success') {
      this.setState({ logged_in: true });
      this.setState({ 'points': data.points })
      this.setState({ 'username': data.username })
      // set the token we receive into local storage
      localStorage.setItem('token', data.token);

      alert('You are now registered!');

      //pushes the user to the 'play' page
      this.props.history.push('/play');
    } else {
      alert(data.Error);
    }

  }

  render() {
  return (
    <div className="App">
      <Header  toggle={this.state.toggle} points={this.state.points} logged_in={this.state.logged_in}/>
      <Switch>
        <Route exact path={['/', '/login']} render={() => <Login handleLogin={this.handleLogin} />} />
        <Route exact path='/register' render={() => <Register handleRegister={this.handleRegister}/>} />
        <Route exact path='/play' render={() => <Play logoutUser={this.logoutUser} toggleSongs={this.toggleSongs} toggleHeader={this.toggleHeader} updatePoints={this.updatePoints} points={this.state.points}/>} />
        <Route exact path='/messaging' render={() => <Messaging username={this.state.username} toggleSongs={this.toggleSongs} toggleHeader={this.toggleHeader}/>} />
        <Route exact path='/songs' render={() => <Songs toggleHeader={this.toggleHeader} toggleSongs={this.toggleSongs} />}/>
      </Switch>
    </div>
  );
}
}

export default withRouter(App);
