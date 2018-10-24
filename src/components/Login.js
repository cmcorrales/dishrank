import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { connect } from 'react-redux';
import { usersFetchData } from '../actions/users';
import { login } from '../actions/users';
import { Input, Grid, Button, Card, Message } from 'semantic-ui-react';


class Login extends Component {
  componentDidMount() {
      this.props.fetchData('http://localhost:3000/api/v1/login');
  }

  state = {
    username: '',
    password: '',
    currentUser: [],
    unverifiedLogin: false,
  }

  handleOnChange = (event) => {
    this.setState({
      username: event.target.value,
      password: event.target.value
    });
    console.log(this.state.username, this.state.password)
  }

  // getCurrentUser = () => {
  //   if(this.props.login)
  // }


  render() {
    console.log("user=",this.props.login)
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
  console.log(state)
  return {
      users: state.users,
      hasError: state.usersHaveError,
      isLoading: state.usersAreLoading,
      userLoginSuccess: state.userLoginSuccess,
      login: state.loginsReducer.login
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
