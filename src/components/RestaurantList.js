import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { restaurantsFetchData } from '../actions/restaurants';
import { withRouter, Router, Route } from 'react-router-dom';
import history from '../history';
import Restaurant from './Restaurant';
import SelectedRestaurant from './SelectedRestaurant';

class RestaurantList extends Component {
  componentDidMount() {
      this.props.fetchData('http://localhost:3000/api/v1/restaurants');
  }

  goToSelectedRestaurant = (restaurant) => {
    this.props.history.push('/selectedrestaurant')
    this.props.selectRestaurant(restaurant)
  };

  render() {
      if (this.props.hasError) {
          return <p>Sorry! There was an error loading the restaurants</p>;
      }

      if (this.props.isLoading) {
          return <p>Loading…</p>;
      }

      const renderedRestaurants = this.props.restaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} restaurant={restaurant} handleClick={() => this.goToSelectedRestaurant(restaurant)}/>
      })

      return (
          <div>
              <Card.Group>
                {renderedRestaurants}
              </Card.Group>
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
      selectRestaurant: (restaurant) => dispatch({type: 'SELECT_RESTAURANT', payload: restaurant})
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantList));
