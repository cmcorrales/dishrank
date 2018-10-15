import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { restaurantsFetchData } from '../actions/restaurants';
import Restaurant from './Restaurant'

class RestaurantList extends Component {
  componentDidMount() {
      this.props.fetchData('http://localhost:3000/api/v1/restaurants');
  }

  render() {
      if (this.props.hasError) {
          return <p>Sorry! There was an error loading the restaurants</p>;
      }

      if (this.props.isLoading) {
          return <p>Loading…</p>;
      }

      const renderedRestaurants = this.props.restaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} restaurant={restaurant}/>
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
      isLoading: state.restaurantsAreLoading
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(restaurantsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
