import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Grid, Card, Popup } from 'semantic-ui-react';
import { addRestaurant } from '../actions/restaurants';
import NavigationBar from './NavigationBar'

class AddRestaurant extends React.Component {
  state = {
    name: '',
    // imageUrl: '',
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   this.props.onAddRestaurant(this.state.username, this.state.password)
  // }


  render() {
    return(
      <React.Fragment>
        <NavigationBar />
        <Card centered>
          <Card.Content>
          <form onSubmit={(event)=>{event.preventDefault();this.props.onAddRestaurant(this.state.name)}}>
            <Grid centered columns={4}>
              <Grid.Row>
                <Input type="text" name="name"  onChange={this.handleOnChange} placeholder="restaurant name" />
              </Grid.Row>

              {/* <Grid.Row>
                <Input type="text" name="imageUrl" onChange={this.handleOnChange} placeholder="restaurant image URL" />
              </Grid.Row> */}

              <Grid.Row>
                <Popup trigger=<Button fluid primary>Add Restaurant</Button> content='Restaurant successfully added.' on='click' position='bottom center'/>
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
    onAddRestaurant: (name) => {
      dispatch(addRestaurant(name))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddRestaurant)
