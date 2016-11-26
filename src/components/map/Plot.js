import React from "react";
import Plotly from "plotly.js";

export default class Plot extends React.Component {

  componentDidMount() {
    // var trace1 = {
    //   x: [1, 2, 3, 4],
    //   y: [10, 15, 13, 17],
    //   type: 'scatter'
    // };
    //
    // var trace2 = {
    //   x: [1, 2, 3, 4],
    //   y: [16, 5, 11, 9],
    //   type: 'scatter'
    // };
    //
    // var data = [trace1, trace2];
    //
    // Plotly.newPlot('myDiv', data);
    var lineChartData = [
      // First series
      {
        label: "Series 1",
        values: [ {time: 1370044800, y: 100}, {time: 1370044801, y: 1000}, ]
      },

      // The second series
      {
        label: "Series 2",
        values: [ {time: 1370044800, y: 78}, {time: 1370044801, y: 98}, ]
      },
    ];
    console.log(window)
    window.jQuery('#myDiv').epoch({
      type: 'time.line',
      data: lineChartData
    });
  }

  render() {
    return (
      <div id="myDiv"></div>
    )
  }
}
