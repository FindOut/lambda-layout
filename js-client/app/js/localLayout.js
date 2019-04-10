const Viz = require('viz.js');
const { Module, render } = require('viz.js/lite.render.js');


export default function localLayout(graph) {
  let viz = new Viz({ Module, render });
  let dotString = graphToDotFormat(graph);
  console.log(dotString);
  return viz.renderJSONObject(dotString)
      .then(result => {
        console.log(result);
        let layoutedGraph = vizJsonToGraph(graph, result);
        console.log(layoutedGraph);
        return layoutedGraph;
      })
      .catch(message => console.error(message));
}

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

function vizJsonToGraph(graph, vizJson) {
  return {
    nodes: vizJson.objects.map(obj => {let pos = obj.pos.split(','); return {id: obj.name, text: obj.label, x: +pos[0], y: +pos[1]}}),
    relations: graph.relations
  }
}
