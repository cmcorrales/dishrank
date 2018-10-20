import React from 'react';
import { connect } from 'react-redux';
import { Segment, Rating, Button, Icon, Label, Modal } from 'semantic-ui-react';
import { addRating } from '../actions/restaurants';
import NavigationBar from './NavigationBar'
import GiveFeedbackModal from './GiveFeedbackModal';
import ViewFeedbackModal from './ViewFeedbackModal';
import axios from 'axios';

class SelectedRestaurant extends React.Component {
  state = {
    dishes: [],
    rating: '',
    dishId: '',
    dishName: '',
  }

  show = (dimmer, dishName, dishId) => () => this.setState({ dimmer, open: true, dishName: dishName, dishId: dishId })
  close = () => this.setState({ open: false })

  componentDidMount() {
    const menusArray = this.props.selectedRestaurant.selectedRestaurant.menus[0]
    const currentMenu = menusArray ? menusArray.dishes.map(dish => dish) : null;
    this.setState({
      dishes: currentMenu
    })
  }

  handleRate = (e, rating, dishId) => {
    this.setState({
      rating: rating,
      dishId: dishId,
    })
    this.props.onAddRating(rating, dishId)
  }

  getAverageRating = () => {

  }

  displayDishes = (dishes) => {
    const { open, dimmer } = this.state
    return dishes.map(dish => {
      return (
        <div>
            <Segment color='red' raised>
              <Label className='label-position' as='a' color='red' ribbon>
                <Icon name='star' /> 23
              </Label>
              <span>{dish.name}</span><br/>
              <Rating icon='star' defaultRating={0} maxRating={5} size='massive' onRate={(e, {rating}) => this.handleRate(e, rating, dish.id, dish.name)} /><br/>
              <Button onClick={this.show('blurring', dish.name, dish.id)} color='red'>give feedback</Button><Button color='blue' onClick={this.show('blurring')}>view feedback</Button>
            </Segment>
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
              <GiveFeedbackModal dishName={this.state.dishName} dishId={this.state.dishId} onClose={this.close}/>
            </Modal>
        </div>
      )
    })
  }

  checkDishes = (dishes) => {
    if (dishes) {
      return this.displayDishes(dishes)
    }
    else {
      return (<div>
              <Segment>This restaurant does not have any menu items to display.</Segment>
            </div>
          )
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <div className="menuItems">
          <h1 className="heading">{this.props.selectedRestaurant.selectedRestaurant.name}</h1>
          { this.checkDishes(this.state.dishes) }
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRating: (rating, dishId) => {
      dispatch(addRating(rating, dishId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant)
