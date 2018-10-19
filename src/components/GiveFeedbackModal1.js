import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Segment } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import { connect } from 'react-redux';
import LikertScale from 'likert-react';

class GiveFeedbackModal extends Component {
  state=  {
    open: true,
    reviewId: 0,
    moreSalty: 0,
    lessSalty: 0,
    moreSpicy: 0,
    lessSpicy: 0,
    moreSweet: 0,
    lessSweet: 0,
  }
  close = () => this.setState({ open: false })
  show = (dimmer, dishName) => () => this.setState({ dimmer, open: true, dishName: dishName })

  onDone = (event)=>{
    event.preventDefault()
    this.props.onAddReview(this.props.dishId, this.state.moreSalty, this.state.lessSalty, this.state.moreSpicy, this.state.lessSpicy, this.state.moreSweet, this.state.lessSweet)
    this.props.onClose();
  }
  render() {

    const moreSalty = [{ question: 'Make it more salty' }]
    const lessSalty = [{ question: 'Make it less salty' }]
    const moreSpicy = [{ question: 'Make it more spicy' }]
    const lessSpicy = [{ question: 'Make it less spicy' }]
    const moreSweet = [{ question: 'Make it more sweet' }]
    const lessSweet = [{ question: 'Make it less sweet' }]

    const onClick = (q, n) => {
      //console.info('question: ' + q + ' answer: ' + n);
      const flavors = ["Salty", "Spicy", "Sweet"]
      return flavors.map(flavor => {
        console.log(q, `Make it more ${flavor}`)
        if (q.toLowerCase() === `Make it more ${flavor}`.toLowerCase()) {
          this.setState({
            [`more${flavor}`]: parseInt(`${this.state["more"+flavor]}`) + n
          })
          console.log(flavor, this.state.moreSalty, parseInt(`${this.state["more"+flavor]}`) + n)
        }
        if (q.toLowerCase() === `Make it less ${flavor}`.toLowerCase()) {
          this.setState({
            [`less${flavor}`]: parseInt(`${this.state["less"+flavor]}`) + n
          })
        }
      })
    }

    // const handleButtonClick = (event) => {
    //   this.close
    // }

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
          //onSubmit={this.props.onAddReview(this.props.dishId, this.state.moreSalty, this.state.lessSalty, this.state.moreSpicy, this.state.lessSpicy, this.state.moreSweet, this.state.lessSweet)}
          onClick={this.onDone}
        />
      </Modal.Actions>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddReview: (dishId, moreSalty, lessSalty, moreSpicy, lessSpicy, moreSweet, lessSweet) => {
      dispatch(addReview(dishId, moreSalty, lessSalty, moreSpicy, lessSpicy, moreSweet, lessSweet));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveFeedbackModal);
