import React, { Component } from 'react';
// import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import RestaurantSearch from './components/RestaurantSearch';
import NavigationBar from './components/NavigationBar';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <div className="hero-image">
          <h1 className="heading">dish•rank</h1>
          <RestaurantSearch />
        </div>
        <RestaurantList />
      </div>
    );
  }
}

export default App;
