import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button, Icon, Grid, Card } from 'semantic-ui-react';
import { addUser } from '../actions/users';
import NavigationBar from './NavigationBar'
import axios from 'axios';

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    redirectToSignUp: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.username, this.state.password)
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   this.props.onAddUser(this.state.username, this.state.password)
  // }


  render() {
    return(
      <React.Fragment>
        <NavigationBar />
        <Card centered>
          <Card.Content>
          <form onSubmit={(event)=>{event.preventDefault();this.props.onAddUser(this.state.username, this.state.password)}}>
            <Grid centered columns={4}>
              <Grid.Row>
                <Input type="text" name="username"  onChange={this.handleOnChange} placeholder="username" />
              </Grid.Row>

              <Grid.Row>
                <Input type="password" name="password" onChange={this.handleOnChange} placeholder="password" />
              </Grid.Row>

              <Grid.Row>
                <Button fluid primary >Sign Up</Button>
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
    onAddUser: (username, password) => {
      dispatch(addUser(username, password))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
