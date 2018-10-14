import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    user: [],
    currentUser: [],
    username: '',
    password: '',
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  handleClick = (event) => {
    event.preventDefault()
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

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users')
      .then(res => res.json())
      .then(data => this.setState({
        users: data
      }))
  }


  render() {
    return(
      <React.Fragment>
        <form>
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="username"/>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
          <Link onClick={this.handleClick} to={{
            pathname: '/RestaurantList/',
          }}>
          Login
        </Link>
        </form>
      </React.Fragment>
    )
  }
}

export default Login;
