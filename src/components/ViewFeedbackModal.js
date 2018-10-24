import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Segment } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import { dishesFetchData } from '../actions/restaurants';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";


class ViewFeedbackModal extends Component {
  // get all reviews that match a specific dish at a restaurant, add to redux state
  constructor(props) {
    super(props);

    this.state = {
            options: {
            chart: {
                height: 440,
                type: 'bar',
                stacked: true
            },
            colors: ['#008FFB','#FF4560'],
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '100%',

                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 1,
                colors: ["#fff"]
            },
            grid: {
                xaxis: {
                    showLines: false
                }
            },
            yaxis: {
                min: -100,
                max: 100,
                title: {
                   // text: 'Age',
                },
            },
            tooltip: {
                shared: false,
                x: {
                    formatter: function(val) {
                        return val
                    }
                },
                y: {
                    formatter: function(val) {
                        return Math.abs(val) + "%"
                    }
                }
            },
            title: {
                text: this.props.dishName
            },
            xaxis: {
              categories: ['saltiness', 'heat', 'sweetness', 'portion size'],
              title: {
                  text: 'Percent'
              },
              labels: {
                formatter: function(val) {
                  return Math.abs(Math.round(val)) + "%"
                  }
                }
              }
            },
            series: [{
                name: 'increase',
                data: [this.moreSaltyPercent(), this.moreSpicyPercent(), this.moreSweetPercent(), this.morePortionPercent()]
            },
            {
                name: 'decrease',
                data: [-this.lessSaltyPercent(), -this.lessSpicyPercent(), -this.lessSweetPercent(), -this.lessPortionPercent()]
            }],
        };
  }

  close = () => this.setState({ open: false });

  show = (dimmer, dishName) => () => this.setState({ dimmer, open: true });

// bearros code
  // data.map(obj => obj.reviews).forEach(x => x.length > 0 ? x.forEach(r => console.log(r.rating)) : 'empty array')


  moreSaltyPercent = () => {
    if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
      return "No ratings"
    }
    else {
      const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
      const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
      const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
      const flavorAdjustmentReviews = allReviews.filter(review => review.more_salty === true)
      const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
      const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
      return percent
  }
}

lessSaltyPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.less_salty === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

moreSpicyPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.more_spicy === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

lessSpicyPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.less_spicy === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

moreSweetPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.more_sweet === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

lessSweetPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.less_sweet === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

morePortionPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.more_portion === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

lessPortionPercent = () => {
  if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
    return "No ratings"
  }
  else {
    const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
    const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)
    const numReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
    const flavorAdjustmentReviews = allReviews.filter(review => review.less_portion === true)
    const numFlavorAdujstmentReviews = flavorAdjustmentReviews.length
    const percent = Math.round((numFlavorAdujstmentReviews / numReviewsWithFlavorFeedback) * 100)
    return percent
  }
}

  render() {
    // console.log("filtereddishes//:", this.props.filteredDishes)
    // console.log("reviewProperty++:", this.getReviewsArray())
    if (this.props.hasError) {
        return <p>Sorry! There was an error loading the feedback data for this dish.</p>;
    }

    if (this.props.isLoading) {
        return <p>Loading…</p>;
    }

    // if (this.props.dishes) {
    //   this.props.dishes.map(dish => {
    //     console.log("dish name:",dish)
    //   })
    // }

    return (
      <React.Fragment>
      <Modal.Header>Feedback for {this.props.selectedRestaurant.selectedRestaurant.name}: {this.props.dishName}</Modal.Header>
      <Modal.Content>
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content="Done"
          //onSubmit={this.props.onAddReview(this.props.dishId, this.state.moreSalty, this.state.lessSalty, this.state.moreSpicy, this.state.lessSpicy, this.state.moreSweet, this.state.lessSweet)}
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
      // selectedDish: state.selectedDish,
      dishes: state.dishes,
      hasError: state.dishesHaveError,
      isLoading: state.dishesAreLoading,
  };
};


export default connect(mapStateToProps)(ViewFeedbackModal);
