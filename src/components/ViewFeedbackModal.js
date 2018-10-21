import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Segment } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";


class ViewFeedbackModal extends Component {
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
              }
            },
            series: [{
                name: 'Males',
                data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5, 3]
            },
            {
                name: 'Females',
                data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8]
            }],
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
                text: 'Mauritius population pyramid 2011'
            },
            xaxis: {
              categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4'],
              title: {
                  text: 'Percent'
              },
              labels: {
                formatter: function(val) {
                  return Math.abs(Math.round(val)) + "%"
                }
              }
            },
        };
  }

  close = () => this.setState({ open: false })
  show = (dimmer, dishName) => () => this.setState({ dimmer, open: true })

  render() {

    return(
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
  }
}

export default connect(mapStateToProps)(ViewFeedbackModal);
