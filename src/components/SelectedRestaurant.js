import React from 'react';
import { connect } from 'react-redux';
import { Segment, Rating, Button, Icon, Label, Modal } from 'semantic-ui-react';
import { addRating } from '../actions/restaurants';
import NavigationBar from './NavigationBar'
import GiveFeedbackModal from './GiveFeedbackModal';
import ViewFeedbackModal from './ViewFeedbackModal';
import AddDish from './AddDish';

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
    const dishesArray = this.props.selectedRestaurant.selectedRestaurant.dishes
    console.log(dishesArray)
    const dishes = dishesArray ? dishesArray.map(dish => dish) : null;
    this.setState({
      dishes: dishes,
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
              <Button onClick={this.show('blurring', dish.name, dish.id)} color='red'>give feedback</Button>
              <Modal trigger={<Button color='blue'>view feedback</Button>}>
                <ViewFeedbackModal filteredDishes={this.filteredDishes(dish.id)} dishName={dish.name}/>
              </Modal>
            </Segment>
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
              <GiveFeedbackModal dishName={this.state.dishName} dishId={this.state.dishName} onClose={this.close}/>
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

  filteredDishes = (dishId) => {
    return this.props.dishes.filter(dish => dish.id === dishId)
  }

  render() {
    console.log("filtered dishes:",this.filteredDishes())
    return (
      <React.Fragment>
        <NavigationBar />
        <div className="menuItems">
          <h1 className="heading">{this.props.selectedRestaurant.selectedRestaurant.name}</h1>
          { this.checkDishes(this.state.dishes) }
          <AddDish />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
    dishes: state.dishes,
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
