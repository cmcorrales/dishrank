import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { connect } from 'react-redux';
import { usersFetchData } from '../actions/users';
import { login } from '../actions/users';
import { Input, Grid, Button, Card, Message } from 'semantic-ui-react';


class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.username, this.state.password)
  }



  render() {
    return(
      <React.Fragment>
        <NavigationBar />
        <Card centered>
          <Card.Content>
            <form onSubmit={(event)=>{event.preventDefault();this.props.onLogin(this.state.username, this.state.password)}}>
            <Grid centered columns={4}>
              <Grid.Row>
                <Input type="text" name="username"  onChange={this.handleOnChange} placeholder="username" />
              </Grid.Row>

              <Grid.Row>
                <Input type="password" name="password" onChange={this.handleOnChange} placeholder="password" />
              </Grid.Row>

              <Grid.Row>
                <Button fluid primary>Login</Button>
              </Grid.Row>
              </Grid>
            </form>
          </Card.Content>
          <Message centered>
            <p>
              New user? <a href="/signup">Sign up.</a>
            </p>
          </Message>
        </Card>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      users: state.users,
      hasError: state.usersHaveError,
      isLoading: state.usersAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(usersFetchData(url)),
      selectUser: (user) => dispatch({type: 'SELECT_USER', payload: user}),
      onLogin: (username, password) => {
        dispatch(login(username, password))
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
