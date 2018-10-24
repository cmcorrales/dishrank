import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Grid, Button, Card, Message } from 'semantic-ui-react';
import NavigationBar from './NavigationBar'



class Login extends Component {
  state = {
    username: '',
    password: '',
    users: [],
    badLogin: false,
    badUserCreate: false,
  }

  componentWillUnmount() {
    this.setState({badLogin: false, badUserCreate: false})
  }

  handleLoginResponse = (data) => {
    if (data.error) {
      this.setState({loginUsername: '', loginPassword: '', badLogin: true})
    } else {
      this.props.changeUserId(data.user);
      this.props.handleModalClose();
    }
  }


  handleLoginSubmit = (event) => {
    fetch('http://localhost:3000/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.loginUsername,
        password: this.state.loginPassword,
      })
    })
    .then(res => res.json())
    .then(data => this.handleLoginResponse(data))
    // const loggedInUser = this.state.users.find(user => {
    //   return user.name === this.state.loginUsername
    // })
    // console.log(loggedInUser)
    // if (loggedInUser && loggedInUser.password === this.state.loginPassword) {
    //   this.props.changeUserId(loggedInUser);
    //   this.setState({loginUsername: '', loginPassword: '', badLogin: false, badUserCreate: false})
    //   this.props.handleModalClose();
    // } else {
    //   this.setState({loginUsername: '', loginPassword: '', badLogin: true})
    // }
  }

  handleLoginUsernameChange = (event) => {
    this.setState({loginUsername: event.target.value})
  }

  handleLoginPasswordChange = (event) => {
    this.setState({loginPassword: event.target.value})
  }

  render() {
    console.log("user==",this.props.userId)
    return (
      // {this.state.badLogin ? <Header color='green' content='Please provide valid login credentials' /> : null}
      <React.Fragment>
        <NavigationBar />
        <Card centered>
          <Card.Content>
            <form onSubmit={this.handleLoginSubmit}>
            <Grid centered columns={4}>
              <Grid.Row>
                <Input type="text" value={this.props.username} name="username" onChange={this.handleLoginUsernameChange} placeholder="username" />
              </Grid.Row>
              <Grid.Row>
                <Input type="password" value={this.props.password} name="password" onChange={this.handleLoginPasswordChange} placeholder="password" />
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

function mapStateToProps(state){
  return {
    userId: state.userId,
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeUserId: (user) => {
      dispatch({type: 'SELECT_USER', payload: user})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
