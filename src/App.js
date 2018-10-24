import React, { Component } from 'react';
// import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import RestaurantSearch from './components/RestaurantSearch';
import NavigationBar from './components/NavigationBar';
import { Input, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { restaurantsFetchData } from './actions/restaurants';

import './App.css';

class App extends Component {
  componentDidMount() {
      this.props.fetchData('http://localhost:3000/api/v1/restaurants');
  }

  state = {
    searchTerm: '',
    restaurants: this.props.restaurants,
    currentlyDisplayed: []
  }

  handleInputChange = (event) => {
    console.log(event.target.value)
    this.setState({
      searchTerm: event.target.value,
    })
  }

  filterRestaurants = () => {
    const filteredRestaurants = this.props.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    console.log("filteredRestaurants ", filteredRestaurants)
    return filteredRestaurants
  }

  showRestaurants = () => {
    return this.state.searchTerm ? this.filterRestaurants() : this.props.restaurants
  }

  render() {
    console.log(this.state.restaurants, this.state.searchTerm)

    return (
      <div className="App">
        <NavigationBar />
        <div className="hero-image">
          <h1 className="heading">dish•rank</h1>
          <div><Input icon="search" value={this.props.searchTerm} onChange={this.handleInputChange} placeholder="search"/></div>

        </div>
        <RestaurantList filteredRestaurants={this.showRestaurants()}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      restaurants: state.restaurants,
      hasError: state.restaurantsHaveError,
      isLoading: state.restaurantsAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(restaurantsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
