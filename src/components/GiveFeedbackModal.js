import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Segment, Icon, Grid } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import { connect } from 'react-redux';

class GiveFeedbackModal extends Component {
  state=  {
    open: true,
    reviewId: false,
    moreSalty: false,
    neutralSalty: false,
    lessSalty: false,
    moreSpicy: false,
    neutralSpicy: false,
    lessSpicy: false,
    moreSweet: false,
    neutralSweet: false,
    lessSweet: false,
    morePortion: false,
    neutralPortion: false,
    lessPortion: false,
  }

  onDone = (event) => {
    event.preventDefault()
    this.props.onAddReview(this.props.dishId, this.state.moreSalty, this.state.neutralSalty, this.state.lessSalty, this.state.moreSpicy, this.state.neutralSpicy, this.state.lessSpicy, this.state.moreSweet, this.state.neutralSweet, this.state.lessSweet, this.state.morePortion, this.state.neutralPortion, this.state.lessPortion)
    this.props.onClose();
  }

  handleClick = (flavorAdjustment) => {
    const flavorArray = flavorAdjustment.split(/(?=[A-Z])/)
    const flavor = flavorArray[1]
    console.log(flavorAdjustment)
    this.setState({
      [`less${flavor}`]: false,
      [`neutral${flavor}`]: false,
      [`more${flavor}`]: false,
    })
    this.setState(prevState => ({
      [`${flavorAdjustment}`]: true,
    }))
  }


  close = () => this.setState({ open: false })
  show = (dimmer, dishName) => () => this.setState({ dimmer, open: true, dishName: dishName })

  render() {
    console.log("dish id from modal: ", this.props.dishId)
    return(
      <React.Fragment>
        <Modal.Header>How can {this.props.selectedRestaurant.selectedRestaurant.name} improve their {this.props.dishName}?</Modal.Header>
        <Modal.Content>
          <Segment padded>
            Salty level
            <Grid columns={3} relaxed>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('moreSalty')} name='arrow alternate circle up' size='big' color={this.state.moreSalty === true? 'green' : 'black'}/><br/>
                Increase
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('neutralSalty')} name='thumbs up' size='big' color={this.state.neutralSalty === true? 'green' : 'black'}/><br/>
                Keep as is
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('lessSalty')} name='arrow alternate circle down' size='big' color={this.state.lessSalty === true? 'green' : 'black'}/><br/>
                Decrease
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment padded>
            Spicy level
            <Grid columns={3} relaxed>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('moreSpicy')} name='arrow alternate circle up' size='big' color={this.state.moreSpicy === true? 'green' : 'black'}/><br/>
                Increase
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('neutralSpicy')} name='thumbs up' size='big' color={this.state.neutralSpicy === true? 'green' : 'black'}/><br/>
                Keep as is
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('lessSpicy')} name='arrow alternate circle down' size='big' color={this.state.lessSpicy === true? 'green' : 'black'}/><br/>
                Decrease
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment padded>
            Sweet level
            <Grid columns={3} relaxed>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('moreSweet')} name='arrow alternate circle up' size='big' color={this.state.moreSweet === true? 'green' : 'black'}/><br/>
                Increase
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('neutralSweet')} name='thumbs up' size='big' color={this.state.neutralSweet === true? 'green' : 'black'}/><br/>
                Keep as is
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('lessSweet')} name='arrow alternate circle down' size='big' color={this.state.lessSweet === true? 'green' : 'black'}/><br/>
                Decrease
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment padded>
            Portion size
            <Grid columns={3} relaxed>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('morePortion')} name='arrow alternate circle up' size='big' color={this.state.morePortion === true? 'green' : 'black'}/><br/>
                Increase
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('neutralPortion')} name='thumbs up' size='big' color={this.state.neutralPortion === true? 'green' : 'black'}/><br/>
                Keep as is
              </Grid.Column>
              <Grid.Column>
                <Icon onClick={() => this.handleClick('lessPortion')} name='arrow alternate circle down' size='big' color={this.state.lessPortion === true? 'green' : 'black'}/><br/>
                Decrease
              </Grid.Column>
            </Grid>
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

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddReview: (dishId, moreSalty, neutralSalty, lessSalty, moreSpicy, neutralSpicy, lessSpicy, moreSweet, neutralSweet, lessSweet, morePortion, neutralPortion, lessPortion) => {
      dispatch(addReview(dishId, moreSalty, neutralSalty, lessSalty, moreSpicy, neutralSpicy, lessSpicy, moreSweet, neutralSweet, lessSweet, morePortion, neutralPortion, lessPortion));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiveFeedbackModal);
