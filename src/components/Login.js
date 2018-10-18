import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { usersFetchData } from '../actions/users';
import { Input, Grid, Button, Card } from 'semantic-ui-react'


class Login extends Component {

  componentDidMount() {
      this.props.fetchData('http://localhost:3000/api/v1/users');
  }

  state = {
    username: "",
    password: "",
    redirect: false
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addUser(this.state.username, this.state.password)
    console.log(this.state)
    const currentUser = this.state.users.filter(user => user.username.toLowerCase() === this.state.username.toLowerCase())
    return currentUser ? currentUser.map(user => {
      return this.setState({
        currentUser: user.id
      })
    }) :
    null
  }

  getUser = () => {
    return this.state.currentUser ? this.state.currentUser[0] :null
  }


  render() {
    console.log(this.props.users)
    return(
      <React.Fragment>
        <NavigationBar />
        <Card centered>
          <Card.Content>
          <form>
            <Grid centered columns={4}>
              <Grid.Row>
                <Input type="text" value={this.props.username} onChange={this.handleChange} placeholder="username" />
              </Grid.Row>

              <Grid.Row>
                <Input type="password" value={this.props.password} onChange={this.handleChange} placeholder="password" />
              </Grid.Row>

              <Grid.Row>
                <Button fluid primary>Login</Button>
              </Grid.Row>
              </Grid>
            </form>
          </Card.Content>
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
      selectUser: (user) => dispatch({type: 'SELECT_USER', payload: user})
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
