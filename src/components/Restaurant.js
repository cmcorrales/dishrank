import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

const Restaurant = (props) => {
      return(
      <Card onClick={props.handleClick} key={props.restaurant.id}>
        <Image src='https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'/>
        <Card.Content>
            <Card.Header>{props.restaurant.name}</Card.Header>
        </Card.Content>
      </Card>
      )
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
  };
};

export default withRouter(connect(mapStateToProps)(Restaurant));
