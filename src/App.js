import React, { Component } from 'react';
import Login from './components/Login.js';
import RestaurantList from './components/RestaurantList.js';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Login />
        <RestaurantList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.username,
    password: state.password
  }
}

export default connect(mapStateToProps)(App);
