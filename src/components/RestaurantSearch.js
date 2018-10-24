import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
// import {search} from './actions';
import Restaurant from './Restaurant';

class RestaurantSearch extends Component {
  state = {
    searchTerm: '',
    currentlyDisplayed: []
  }

  handleInputChange = (event) => {
    this.props.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({
      searchTerm: event.target.value,
    })
  }

  render() {
    const {search, value} = this.props;

    return(
      <React.Fragment>
      <Search className="hero-text" value={value} onChange={(e) => search(e.target.value)} onSubmit={this.handleSearchSubmit} placeholder="search"/>
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


// function mapDispatchToProps(dispatch) {
//   return {
//   search: (e.target.value) => dispatch({type: 'SEARCH', payload: restaurant})
//   }
// }

export default connect(mapStateToProps)(RestaurantSearch);
