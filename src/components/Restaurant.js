import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

const Restaurant = ({ restaurant, selectRestaurant }) => {
  return (
      <Card key={restaurant.id} onClick={() => selectRestaurant(restaurant)}>
        <Image src='https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
        <Card.Content>
          <Card.Header>{restaurant.name}</Card.Header>
        </Card.Content>
      </Card>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      selectRestaurant: (restaurant) => dispatch({type: 'SELECT_RESTAURANT', payload: restaurant})
  };
};

export default connect(null, mapDispatchToProps)(Restaurant);
