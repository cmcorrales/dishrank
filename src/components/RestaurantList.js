import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Restaurant from './Restaurant';

class RestaurantList extends Component {

  goToSelectedRestaurant = (restaurant) => {
    this.props.history.push('/selectedrestaurant')
    this.props.selectRestaurant(restaurant)
  };


  render() {
    console.log(this.props)
      if (this.props.hasError) {
          return <p>Sorry! There was an error loading the restaurants</p>;
      }

      if (this.props.isLoading) {
          return <p>Loading…</p>;
      }

      const renderedRestaurants = this.props.filteredRestaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} restaurant={restaurant} handleClick={() => this.goToSelectedRestaurant(restaurant)}/>
      })

      return (
          <div>
              <Card.Group className='restaurantCard'>
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
      selectRestaurant: (restaurant) => dispatch({type: 'SELECT_RESTAURANT', payload: restaurant})
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantList));
