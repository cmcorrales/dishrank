import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';

class RestaurantSearch extends Component {
  state = {
    searchTerm: '',
    currentlyDisplayed: []
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
      <Search className="hero-text">
        <input type="text" value={this.props.searchTerm} onChange={this.handleInputChange} placeholder="search"/>
      </Search>
      {/* <Restaurant currentlyDisplayed={this.state.currentlyDisplayed}/> */}
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
