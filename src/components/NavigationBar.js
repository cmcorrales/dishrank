import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'


export default class MenuExampleSecondaryPointing extends Component {
  state = {
    activeItem: 'home',
    redirectToLogin: false,
    redirectToHome: false
  }

  handleLoginClick = (e, { name }) => {
    this.setState({
      activeItem: name,
      redirectToLogin: true,
      redirectToHome: false
    })
  }

  handleHomeClick = (e, { name }) => {
    this.setState({
      activeItem: name,
      redirectToLogin: false,
      redirectToHome: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirectToLogin) {
      return <Redirect to='/login' />
    }
    if (this.state.redirectToHome) {
      return <Redirect to='/' />
    }
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        {this.renderRedirect()}
        <Menu pointing secondary color='red'>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleHomeClick} />
          <Menu.Item
            name='add restaurant'
            active={activeItem === 'add restaurant'}
            onClick={this.handleHomeClick}
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleLoginClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
