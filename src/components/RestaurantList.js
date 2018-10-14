import React, { Component } from 'react';
import { connect } from 'react-redux';
import { restaurantsFetchData } from '../actions/restaurants';
import { Card, Image } from 'semantic-ui-react'

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

      return (
          <div>
              {this.props.restaurants.map((restaurant) => (
                <Card.Group>
                <Card key={restaurant.id}>
                  <Image src='https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
                  <Card.Content>
                    <Card.Header>{restaurant.name}</Card.Header>
                  </Card.Content>
                </Card>
                </Card.Group>
              ))}
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
      fetchData: (url) => dispatch(restaurantsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
