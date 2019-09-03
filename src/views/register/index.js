import React, { Component } from 'react';
import './index.css';




class Register extends Component {
  render() {
    return (
      <div className="register-page">
        <h1>Register</h1>
        <div className="row">
          <div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-8 offset-2">
            <form onSubmit={this.props.handleRegister}>
              <input className="form-control" type="text" name="email" placeholder="Email..." />
              <input className="form-control" type="password" name="pass" placeholder="Password..." />
              <input type="submit" className="btn btn-primary" value="Register" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
