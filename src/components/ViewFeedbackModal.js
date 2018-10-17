// import React, { Component } from 'react';
// import { Button, Header, Image, Modal, Divider, Segment } from 'semantic-ui-react';
// import { addReview } from '../actions/restaurants';
// import { connect } from 'react-redux';
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//
// class ViewFeedbackModal extends Component {
//
//   close = () => this.setState({ open: false })
//   show = (dimmer, dishName) => () => this.setState({ dimmer, open: true, dishName: dishName })
//
//   render() {
//     const options = {
//       animationEnabled: true,
//       title: {
//         text: "Customer Satisfaction"
//       },
//       subtitles: [{
//         text: "71% Positive",
//         verticalAlign: "center",
//         fontSize: 24,
//         dockInsidePlotArea: true
//       }],
//       data: [{
//         type: "doughnut",
//         showInLegend: true,
//         indexLabel: "{name}: {y}",
//         yValueFormatString: "#,###'%'",
//         dataPoints: [
//           { name: "Unsatisfied", y: 5 },
//           { name: "Very Unsatisfied", y: 31 },
//           { name: "Very Satisfied", y: 40 },
//           { name: "Satisfied", y: 17 },
//           { name: "Neutral", y: 7 }
//         ]
//       }]
//     }
//
//     return(
//       <React.Fragment>
//       <Modal.Header>How can {this.props.selectedRestaurant.selectedRestaurant.name} improve their {this.props.dishName}?</Modal.Header>
//       <Modal.Content>
//
//       </Modal.Content>
//       <Modal.Actions>
//         <Button
//           positive
//           icon='checkmark'
//           labelPosition='right'
//           content="Done"
//           //onSubmit={this.props.onAddReview(this.props.dishId, this.state.moreSalty, this.state.lessSalty, this.state.moreSpicy, this.state.lessSpicy, this.state.moreSweet, this.state.lessSweet)}
//           onClick={this.close}
//         />
//       </Modal.Actions>
//       </React.Fragment>
//     )
//   }
// }
//
//
//
// const mapStateToProps = (state) => {
//   return {
//     selectedRestaurant: state.selectedRestaurant,
//   }
// }
//
// export default connect(mapStateToProps)(ViewFeedbackModal);
