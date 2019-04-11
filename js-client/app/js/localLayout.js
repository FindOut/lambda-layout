// vi använder require här för att det skall funka även i node
const Viz = require('viz.js');
const {Module, render} = require('viz.js/lite.render.js');

export default function localLayout(graph) {
  let viz = new Viz({Module, render});

  return viz.renderJSONObject(graphToDotFormat(graph))
      .then(function (result) {
        return vizJsonToGraph(graph, result);
      })
      .catch(message => console.error(message));
}

// convert our graph to dot format that viz.js can understand
function graphToDotFormat(graph) {
  let dot = '';
  for (let node of graph.nodes) {
    dot += '  ' + node.id + ' [label = "' + node.text + '"];\n';
  }
  for (let relation of graph.relations) {
    dot += '  ' + relation.from + ' -> ' + relation.to + ';\n';
  }
  return 'digraph {\n' + dot + '}';
}

// convert from viz.js JSON result back to our graph format
function vizJsonToGraph(graph, vizJson) {
  return {
    nodes: vizJson.objects.map(function(obj) {
      let pos = obj.pos.split(',');
      return {id: obj.name, text: obj.label, x: +pos[0], y: +pos[1]}
    }),
    relations: graph.relations
  }
}
