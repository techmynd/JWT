import React, { Component } from "react";
import "./App.css";
//const bcrypt = require("bcryptjs");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
    };
  }
  handleChange = e => {
    //console.log(e.target.name);
    //console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    //console.log("submitted");
  };
  render() {
    //console.log(this.state);
    const displayForm = () => {
      return (
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <label>Username</label>
            <input
              className='username'
              name='username'
              type='text'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className='password'
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      );
    };
    return (
      <div className='App'>
        {this.state.loggedIn === false
          ? displayForm()
          : `Welcome back ${this.state.username}`}
      </div>
    );
  }
}

export default App;
