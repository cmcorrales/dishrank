import React, { Component } from 'react'
import { connect } from 'react-redux'

class RestaurantSearch extends Component {
  state = {
    searchTerm: '',
    currentlyDisplayed: this.props.restaurants
  }

  handleInputChange = (event) => {
    let newlyDisplayed = this.props.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    })
  }

  render() {
    return(
      <React.Fragment>
        <input type="text" value={this.props.searchTerm} onChange={this.handleInputChange} placeholder="search"/>
      </React.Fragment>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      restaurants: state.restaurants
    }
  }

export default connect(mapStateToProps)(RestaurantSearch);
