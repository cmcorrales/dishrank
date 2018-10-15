import React from 'react'
import { connect } from 'react-redux'

class SelectedRestaurant extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    console.log(this.props.selectedRestaurant)
    return (
      <React.Fragment>
        <h1>{this.props.selectedRestaurant.selectedRestaurant.name}</h1>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant
  }
}

export default connect(mapStateToProps)(SelectedRestaurant)
