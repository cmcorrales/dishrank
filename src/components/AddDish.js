import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Grid, Card } from 'semantic-ui-react';
import { addDish } from '../actions/restaurants';
import NavigationBar from './NavigationBar'

class AddDish extends React.Component {
  state = {
    restaurants: this.props.selectedRestaurant,
    name: '',
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   this.props.onAddDish(this.state.username, this.state.password)
  // }


  render() {
    return(
      <React.Fragment>
        <Card centered>
          <Card.Content>
          <form onSubmit={(event)=>{event.preventDefault();this.props.onAddDish(this.state.name, this.props.selectedRestaurant.selectedRestaurant.id)}}>
            <Grid centered columns={4}>
              <Grid.Row>
                <Input type="text" name="name"  onChange={this.handleOnChange} placeholder="dish name" />
              </Grid.Row>
              <Grid.Row>
                <Button fluid primary>Add Dish</Button>
              </Grid.Row>
              </Grid>
            </form>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddDish: (name, restaurant_id) => {
      dispatch(addDish(name, restaurant_id))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDish)
