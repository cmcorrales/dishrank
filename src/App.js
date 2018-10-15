import React, { Component } from 'react';
// import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import RestaurantSearch from './components/RestaurantSearch'
import './App.css';

class App extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <RestaurantSearch />
        {/* <Login /> */}
        <RestaurantList />
      </div>
    );
  }
}

export default App;
