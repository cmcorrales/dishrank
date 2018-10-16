import React from 'react';
import { connect } from 'react-redux';
import { Segment, Rating, Button, Icon, Label, Modal } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import NavigationBar from './NavigationBar'
import GiveFeedbackModal from './GiveFeedbackModal';
import axios from 'axios';

class SelectedRestaurant extends React.Component {
  state = {
    dishes: [],
    rating: '',
    dishId: '',
    open: false,
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  componentDidMount() {
    const menusArray = this.props.selectedRestaurant.selectedRestaurant.menus[0]
    const currentMenu = menusArray ? menusArray.dishes.map(dish => dish) : null;
    this.setState({
      dishes: currentMenu
    })
  }

  handleRate = (e, {rating}) => {
    this.setState({
      rating: rating
    })
  }

  getDish = (dishId) => {
    this.setState({
      dishId: dishId
    })
  }

  displayDishes = (dishes) => {
    const { open, dimmer } = this.state
    return dishes.map(dish => {
      console.log("dish:", dish.name)
      return (
        <div>
            <Segment color='red' raised>{dish.name}<br/>
              <Rating icon='star' defaultRating={0} maxRating={4} size='massive' onRate={this.handleRate} onClick={() => this.getDish(this.props.review)}/><br/>
              <Button onClick={this.show('blurring')} color='red'>give feedback </Button><Button color='blue' onClick={this.show('blurring')}>view feedback </Button>
            </Segment>
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
              <GiveFeedbackModal />
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
    console.log('dishes:',this.state.dishes)
    // console.log(this.props.selectedRestaurant.selectedRestaurant.menus[0].dishes.map(dish => dish.name))
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
    review: {
      rating: state.rating,
      dish_id: state.dishId
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddReview: ( review ) => {
      dispatch(addReview( review ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant)
