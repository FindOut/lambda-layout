// var d3 = require('d3');
// //var _ = require('lodash');
// import _ from 'lodash';
import render from './renderer';
import localLayout from './localLayout'
import lambdaLayout from './lambdaLayout'

// node and relation data
var graph = {
  nodes: [
    {"id": "1", "text": "a", "x": 20, "y": 30},
    {"id": "2", "text": "b", "x": 90, "y": 30},
    {"id": "3", "text": "c", "x": 160, "y": 30},
    {"id": "4", "text": "d", "x": 55, "y": 80},
    {"id": "5", "text": "e", "x": 145, "y": 80}
  ],

  relations: [
    {"id": "10", "from": "1", "to": "4"},
    {"id": "11", "from": "4", "to": "2"},
    {"id": "12", "from": "2", "to": "3"},
    {"id": "13", "from": "2", "to": "5"}
  ]
}

document.getElementById('localLayout').onclick = function () {
  localLayout(graph).then(function (layoutedGraph) {render(layoutedGraph)})
};
document.getElementById('lambdaLayout').onclick = function() {
  lambdaLayout(graph).then(function (layoutedGraph) {render(layoutedGraph)})
};

render(graph);
