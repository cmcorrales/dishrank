import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LikertScale from 'likert-react';

class GiveFeedbackModal extends Component {
  render() {
    const moreSalty = [{ question: 'Make it more salty' }]
    const lessSalty = [{ question: 'Make it less salty' }]
    const moreSpicy = [{ question: 'Make it more spicy' }]
    const lessSpicy = [{ question: 'Make it less spicy' }]
    const moreSweet = [{ question: 'Make it more sweet' }]
    const lessSweet = [{ question: 'Make it less sweet' }]

    const onClick = (q, n) => console.info('question: ' + q + ' answer: ' + n);
    return(
      <React.Fragment>
      <Modal.Header>How can {this.props.selectedRestaurant.selectedRestaurant.name} improve their {this.props.dishName}?</Modal.Header>
      <Modal.Content>
        <Segment padded>
          <Header fluid><LikertScale reviews={moreSalty} onClick={onClick}/></Header>
          <Divider horizontal>Or</Divider>
          <Header fluid><LikertScale reviews={lessSalty} onClick={onClick}/></Header>
        </Segment>
        <Segment padded>
          <Header fluid><LikertScale reviews={moreSpicy} onClick={onClick}/></Header>
          <Divider horizontal>Or</Divider>
          <Header fluid><LikertScale reviews={lessSpicy} onClick={onClick}/></Header>
        </Segment>
        <Segment padded>
          <Header fluid><LikertScale reviews={moreSweet} onClick={onClick}/></Header>
          <Divider horizontal>Or</Divider>
          <Header fluid><LikertScale reviews={lessSweet} onClick={onClick}/></Header>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content="Done"
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
