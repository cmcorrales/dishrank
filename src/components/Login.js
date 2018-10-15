// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../actions/users';
//
// class Login extends Component {
//
//   state = {
//     username: "",
//     password: "",
//   }
//
//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   }
//
//   handleSubmit = (event) => {
//     event.preventDefault()
//     this.props.addUser(this.state.username, this.state.password)
//     console.log(this.state)
//     // const currentUser = this.state.users.filter(user => user.username.toLowerCase() === this.state.username.toLowerCase())
//     // return currentUser ? currentUser.map(user => {
//     //   return this.setState({
//     //     currentUser: user.id
//     //   })
//     // }) :
//     // null
//   }
//
//   getUser = () => {
//     return this.state.currentUser ? this.state.currentUser[0] :null
//   }
//
//   componentDidMount() {
//     fetch('http://localhost:3000/api/v1/users')
//       .then(res => res.json())
//       .then(data => this.setState({
//         users: data
//       }))
//   }
//
//   render() {
//     return(
//       <React.Fragment>
//         <form>
//           <input type="text" value={this.props.username} onChange={this.handleChange} placeholder="username"/>
//           <input type="password" value={this.props.password} onChange={this.handleChange} placeholder="password"/>
//
//           <Redirect onSubmit={this.handleSubmit} to={{
//             pathname: '/RestaurantList/',
//           }}>
//           Login
//         </Redirect>
//         </form>
//       </React.Fragment>
//     )
//   }
// }
//
//
// export default connect(null, actions)(Login);
