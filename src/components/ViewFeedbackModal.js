import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Segment } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import { dishesFetchData } from '../actions/restaurants';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";


class ViewFeedbackModal extends Component {
  // get all reviews that match a specific dish at a restaurant, add to redux state
    componentDidMount() {
        this.props.fetchData('http://localhost:3000/api/v1/dishes');
    }

    // goToSelectedDish = (dish) => {
    //   this.props.history.push('/selectedDish')
    //   this.props.selectDish(dish)
    // };
  // map through each dish

  // when mapping through each dish:
  // 1. filter the reviews that match the selected dishId and name
  // 2. retrieve
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

  close = () => this.setState({ open: false })
  show = (dimmer, dishName) => () => this.setState({ dimmer, open: true })

  render() {
    console.log("filtereddish33:", this.props.filteredDishes)
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

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(dishesFetchData(url)),
      // selectDish: (dish) => dispatch({type: 'SELECT_DISH', payload: dish})
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewFeedbackModal);
