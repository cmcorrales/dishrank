import React from 'react';
import { connect } from 'react-redux';
import { Segment, Rating, Button, Icon, Label, Modal, Statistic, Header, Popup } from 'semantic-ui-react';
import { addRating } from '../actions/restaurants';
import NavigationBar from './NavigationBar'
import GiveFeedbackModal from './GiveFeedbackModal';
import ViewFeedbackModal from './ViewFeedbackModal';
import AddDish from './AddDish';
import { dishesFetchData } from '../actions/restaurants';

class SelectedRestaurant extends React.Component {
  state = {
    dishes: [],
    rating: '',
    dishId: '',
    dishName: '',
    type: '',
  }

  componentWillReceiveProps(props){
    this.setState({dishes:props.dishes})
  }

  show = (dimmer, dishName, dishId) => () => this.setState({ dimmer, open: true, dishName: dishName, dishId: dishId })
  close = () => this.setState({ open: false })

  componentDidMount() {
    this.props.fetchData('http://localhost:3000/api/v1/dishes');
  }

  handleRate = (e, rating, dishId) => {
    this.setState({
      rating: rating,
      dishId: dishId,
    })
    this.props.onAddRating(rating, dishId)
  }

  getReviewCount = (filteredDishes) => {
    if (filteredDishes === undefined || filteredDishes.length === 0) {
      return "No ratings"
    } else {
      const flavorArray = filteredDishes["0"].reviews.map(item => item.rating)
      const filteredFlavorArray = flavorArray.filter(value => value !== null )
      return filteredFlavorArray.length
    }
  }


  getAverageDishRating = (filteredDishes) => {
    if (filteredDishes === undefined || filteredDishes.length === 0) {
      return "No ratings"
    } else {
      const flavorArray = filteredDishes["0"].reviews.map(item => item.rating)
      const filteredFlavorArray = flavorArray.filter(value => value !== null )
      const averageRating = filteredFlavorArray.reduce((a, b) => a + b, 0) / (filteredFlavorArray.length||1)
      if (averageRating === 0) {
        let roundedRating = "No ratings"
        return roundedRating
      }
      else if (averageRating.toString().length === 1) {
        let roundedRating = averageRating
        return roundedRating
      }
      else {
        let roundedRating = averageRating.toFixed(2)
        return roundedRating
      }
    }
}

  displayDishes = (_dishes) => {
    const { open, dimmer } = this.state
    const id = this.props.selectedRestaurant.selectedRestaurant.id
    //debugger
    const dishes = this.state.dishes.filter(dish => dish.restaurant.id === id)
    return dishes.map(dish => {
      return (
        <div>
            <Segment color='red' raised>
              <Label className='label-position' as='a' color='red' ribbon>
                {this.getAverageDishRating(this.filteredDishes(dish.id))} <Icon name='star' />
              </Label>
              <span><Header as='h2'>{dish.name}</Header></span><br/>
              <div className='rating-container'><Popup trigger={<Rating icon='star' defaultRating={0} maxRating={5} size='massive' onRate={(e, {rating}) => this.handleRate(e, rating, dish.id, dish.name)} />} content='Rating added!' position='right center' on='click' /></div><br/>
              <Button onClick={this.show('blurring', dish.name, dish.id)} color='pink'>give feedback</Button>
              <Modal trigger={<Button color='teal'>view feedback</Button>}>
                <ViewFeedbackModal filteredDishes={this.filteredDishes(dish.id)} dishName={dish.name}/>
              </Modal>
              <div class='reviews-count'>
              <Statistic size='mini'>
                <Statistic.Value>{this.getReviewCount(this.filteredDishes(dish.id))}</Statistic.Value>
                <Statistic.Label>Reviews</Statistic.Label>
              </Statistic>
            </div>
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

  filteredDishes = (dishId) => {
    const id = this.props.selectedRestaurant.selectedRestaurant.id
    console.log("filteredDishes ", id , this.props.dishes)
    return this.props.dishes.filter(dish => dish.id === dishId && dish.restaurant.id === id)
  }

  onChangeType = (event) => {
    console.log(event.target.value)
    this.setState({
      type: event.target.value
    })
    this.sortBy(event)
    // sortDishes()
  }

  // sortDishes(event) {
  //   const sortType = this.state.filters.type
  //   const filteredDishes = allPets.filter(pet => pet.type === petType)
  //
  //   if (petType === 'all') {
  //     this.setState({
  //       pets: allPets
  //     })
  //   } else {
  //     this.setState({
  //       pets: filteredPets
  //     })
  //   }
  // }

  sortBy = (event) => {
    if (event.target.value === 'alphabetical') {
      return this.sortByAlphabetical()
    }
    if (event.target.value === 'rating') {
      return this.sortByRating()
    }
  }

  sortByAlphabetical = () => {
    this.setState((prevState) => {
      const sortedDishes = prevState.dishes.sort((dish1, dish2) => {
        if (dish1.name && dish2.name) {
          const name1 = dish1.name;
          const name2 = dish2.name;
          if(name1.toLowerCase() < name2.toLowerCase()) { return -1; }
          if(name1.toLowerCase() > name2.toLowerCase()) { return 1; }
          }
        return 0;        // return name1.localeCompare(name2)
      })
      return {
        dishes: sortedDishes
      }
    })
  }

  render() {
    console.log("dishes:", this.props.dishes)
    console.log("filtered dishes:",this.filteredDishes())
    return (
      <React.Fragment>
        <NavigationBar />
        <div className="menuItems">
          <div className="restaurant-header">
            <h1 className="heading">{this.props.selectedRestaurant.selectedRestaurant.name}</h1>
            <select onChange= {this.onChangeType}>
              <option value="0">sort by</option>
              <option value="alphabetical">alphabetical</option>
              <option value="rating">rating</option>
              <option value="popularity">popularity</option>
              {/* <Dropdown onChange={ this.onChangeType } placeholder='sort by' fluid search selection options={options} /> */}
            </select>
          </div>
          { this.checkDishes(this.state.dishes) }
          <AddDish />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('map props ', state.dishes)
  return {
    selectedRestaurant: state.selectedRestaurant,
    dishes: state.dishes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRating: (rating, dishId) => {
      dispatch(addRating(rating, dishId));
    },
    fetchData: (url) => dispatch(dishesFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant)
