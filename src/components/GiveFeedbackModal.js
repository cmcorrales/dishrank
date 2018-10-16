import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'

class GiveFeedbackModal extends Component {
  render() {
    return(
      <React.Fragment>
      <Modal.Header>How can {this.props.selectedRestaurant.selectedRestaurant.name} make their {this.props.dishName} better?</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
        <Modal.Description>
          <Header></Header>
          <p>We've found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={this.close}>
          Nope
        </Button>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content="Yep, that's me"
          onClick={this.close}
        />
      </Modal.Actions>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
  }
}

export default connect(mapStateToProps)(GiveFeedbackModal);
