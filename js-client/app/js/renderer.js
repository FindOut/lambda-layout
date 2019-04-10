// create and configure renderers for different node and relations types
var worksheetComponent = new fomod.SvgComponent('worksheet').layout(new fomod.XyLayout());
var boxComponent = new fomod.SimpleTextBoxComponent('anode');
var relationComponent = new fomod.RelationComponent('relation');

export default function render(graph) {
  // run the renderers to create svg elements, and
  // do layout in the right order (first inner then outer)
  var worksheet = worksheetComponent(fomod.d3.select('body'), [{id: 'ws'}]);
  boxComponent(worksheet, graph.nodes).each(function(d) {
    this.fomod.layout(fomod.d3.select(this));
  });
  worksheetComponent.layout()(worksheet);

  // relations has to be layouted last as they need all node positions set
  relationComponent(worksheet, graph.relations).each(function(d) {
    this.fomod.layout(fomod.d3.select(this));
  });

  // attach a select tool to all nodes and relations
  var manipulator = new fomod.Manipulator()
  .add(new fomod.SelectTool());
  fomod.d3.selectAll('.anode, .relation').call(manipulator);
}
