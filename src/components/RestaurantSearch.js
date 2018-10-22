import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {search} from '../actions/restaurants';
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
      <Search className="hero-text" onChange={(e) => search(e.target.value)} value={value} placeholder="search"/>
      {/* <Restaurant currentlyDisplayed={this.state.currentlyDisplayed}/> */}
      </React.Fragment>
    )
  }
}

function mapStateToProps({restaurants}) {
  return {value: restaurants.value};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({search}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);
