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
                    barHeight: '80%',

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
                min: -5,
                max: 5,
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
                data: [0.65, 0.76, 0.88, 1.5]
            },
            {
                name: 'decrease',
                data: [-0.8, -1.18, -1.4, -2.2]
            }],
        };
  }

  close = () => this.setState({ open: false });

  show = (dimmer, dishName) => () => this.setState({ dimmer, open: true });

// bearros code
  // data.map(obj => obj.reviews).forEach(x => x.length > 0 ? x.forEach(r => console.log(r.rating)) : 'empty array')


  getReviewsArray = (flavorAdjustment) => {
    if (this.props.filteredDishes === undefined || this.props.filteredDishes.length == 0) {
      console.log("The array is undefined! Result is: " + this.props.filteredDishes)
      return "No ratings"
    } else {
      console.log("The array has something in it! Result is: " + this.props.filteredDishes["0"])
      const allReviews = this.props.filteredDishes["0"].reviews.map(item => item)
      const reviewsWithFeedback = this.props.filteredDishes["0"].reviews.map(review => `${review[flavorAdjustment]}`)
      const reviewsWithFlavorFeedback = allReviews.filter(review => Object.values(review).indexOf(true) > -1)

      //get reviews where flavorAdjustment value === true
      const flavorAdjustmentReviews = allReviews.filter(review => review.more_salty === true)
      // const NumReviewsWithFlavorFeedback = reviewsWithFlavorFeedback.length
      // const flavorArray = allReviews.map(item => `${item[flavorAdjustment]}`)
      // const numFlavorArray = flavorArray.filter(item => item === "true").length
      // const filteredFlavorArray = flavorArray.filter(value => value !== null )
      // const averageRating = filteredFlavorArray.reduce((a, b) => a + b) / filteredFlavorArray.length
      return reviewsWithFlavorFeedback
    }
  }

  render() {
    console.log("reviews:## ",this.getReviewsArray('more_salty'))
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
