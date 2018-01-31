/*******************************************************************************************/
// Graph functions

var xScale = d3.scaleLinear(), yScale = d3.scaleLinear(),
    controller_state = null, controller_color = null;

function createGraph(){
  d3.select('#origin').remove();

  var graph = d3.select('#graph');
  var width = parseInt(graph.style('width'));
  var height = parseInt(graph.style('height'));

  var origin = graph.append('g').attrs({ id: 'origin', transform: 'translate(' +50+ ',' +(height-50)+ ')' });
  xScale.domain([0, 1]).range([0, width-100]);
  yScale.domain([0, 300]).range([0, -(height-100)]);

  origin.append('g').call( d3.axisBottom(xScale) );
  origin.append('g').call( d3.axisLeft(yScale) );

  origin.append('text').attrs({ class: 'axes_label', 'transform': 'translate(' +xScale(0.8)+ ',' +30+ ')' }).text('Specific Volume →')
  origin.append('g').attrs({ class: 'axes_label', 'transform': 'translate(' +-40+ ',' +yScale(250)+ ') rotate(-90)' })
        .append('text').text('Pressure →');

  origin.append('path').attrs({ id: 'graph_path' }).styles({ 'stroke': '#03a9f4', 'stroke-width': 2, 'fill': 'none' });

  origin.append('circle').attrs({ id: 'p1_circle', r: 4 }).styles({ 'fill': 'red', 'cursor': 'hand' }).data([{ color: 'red', state: state_1 }]);
  origin.append('text').attrs({ id: 'p1_text' }).styles({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }).text(1);

  var p1_controllers = origin.append('g').attrs({ id: 'p1_controllers' }).styles({ 'display': 'none' });
  p1_controllers.append('line').attrs({ id: 'p1_line1' }).styles({ 'stroke': 'gray', 'stroke-dasharray': '3,3' });
  p1_controllers.append('circle').attrs({ id: 'p1_circle1', r: 4 }).styles({ 'fill': 'red', 'cursor': 'hand', 'opacity': 0.8 });
  p1_controllers.append('line').attrs({ id: 'p1_line2' }).styles({ 'stroke': 'gray', 'stroke-dasharray': '3,3' });
  p1_controllers.append('circle').attrs({ id: 'p1_circle2', r: 4 }).styles({ 'fill': 'red', 'cursor': 'hand', 'opacity': 0.8 });

  origin.append('circle').attrs({ id: 'p2_circle', r: 4 }).styles({ 'fill': 'green', 'cursor': 'hand' }).data([{ color: 'green', state: state_1 }]);
  origin.append('text').attrs({ id: 'p2_text' }).styles({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }).text(2);

  var p2_controllers = origin.append('g').attrs({ id: 'p2_controllers' });
  p2_controllers.append('line').attrs({ id: 'p2_line1' }).styles({ 'stroke': 'gray', 'stroke-dasharray': '3,3' });
  p2_controllers.append('circle').attrs({ id: 'p2_circle1', r: 4 }).styles({ 'fill': 'green', 'cursor': 'hand', 'opacity': 0.8 });
  p2_controllers.append('line').attrs({ id: 'p2_line2' }).styles({ 'stroke': 'gray', 'stroke-dasharray': '3,3' });
  p2_controllers.append('circle').attrs({ id: 'p2_circle2', r: 4 }).styles({ 'fill': 'green', 'cursor': 'hand', 'opacity': 0.8 });

  createEvents(); updateGraph();
}

/*******************************************************************************************/

function updateGraph(){
  var graph_data = process_1_2_states.map(d => { return { x: xScale(d.v), y: yScale(d.p) } });
  d3.select('#graph_path').attrs({ d: lineGen(graph_data) });

  d3.select('#p1_circle').attrs({ cx: xScale(state_1.v), cy: yScale(state_1.p) });
  d3.select('#p1_text').attrs({ transform: 'translate(' +(xScale(state_1.v)+10)+ ',' +(yScale(state_1.p)-10)+ ')' })

  d3.select('#p1_line1').attrs({ x1: xScale(state_1.v), y1: yScale(state_1.p), x2: xScale(0), y2: yScale(state_1.p) });
  d3.select('#p1_circle1').attrs({ cx: xScale(0), cy: yScale(state_1.p) }).styles({ 'fill': controller_color });
  d3.select('#p1_line2').attrs({ x1: xScale(state_1.v), y1: yScale(state_1.p), x2: xScale(state_1.v), y2: yScale(0) });
  d3.select('#p1_circle2').attrs({ cx: xScale(state_1.v), cy: yScale(0) }).styles({ 'fill': controller_color });

  d3.select('#p2_circle').attrs({ cx: xScale(state_2.v), cy: yScale(state_2.p) });
  d3.select('#p2_text').attrs({ transform: 'translate(' +(xScale(state_2.v)+10)+ ',' +(yScale(state_2.p)-10)+ ')' })

  d3.select('#p2_line1').attrs({ x1: xScale(state_2.v), y1: yScale(state_2.p), x2: xScale(0), y2: yScale(state_2.p) });
  d3.select('#p2_circle1').attrs({ cx: xScale(0), cy: yScale(state_2.p) }).styles({ 'fill': controller_color });
  d3.select('#p2_line2').attrs({ x1: xScale(state_2.v), y1: yScale(state_2.p), x2: xScale(state_2.v), y2: yScale(0) });
  d3.select('#p2_circle2').attrs({ cx: xScale(state_2.v), cy: yScale(0) }).styles({ 'fill': controller_color });
}

/*******************************************************************************************/

function createEvents(){
  d3.select('#p1_circle1').call(d3.drag().on('drag', function(){
    var temp = yScale.invert(d3.event.y);
    state_1.p = temp; compute(); updateInputs(); updateGraph();
  }))

  d3.select('#p1_circle2').call(d3.drag().on('drag', function(){
    var temp = xScale.invert(d3.event.x);
    state_1.v = temp; compute(); updateInputs(); updateGraph();
  }))

  d3.select('#p2_circle1').call(d3.drag().on('drag', function(){
    var temp = yScale.invert(d3.event.y);
    new_state = {};
    new_state.p = temp; compute(); updateInputs(); updateGraph();
  }))

  d3.select('#p2_circle2').call(d3.drag().on('drag', function(){
    var temp = xScale.invert(d3.event.x);
    new_state = {};
    new_state.v = temp; compute(); updateInputs(); updateGraph();
  }))

  d3.select('#p1_circle').on('click', function(){
    d3.select('#p1_controllers').styles({ 'display': null });
    d3.select('#p2_controllers').styles({ 'display': 'none' });
  })

  d3.select('#p2_circle').on('click', function(){
    d3.select('#p1_controllers').styles({ 'display': 'none' });
    d3.select('#p2_controllers').styles({ 'display': null });
  })
}

/*******************************************************************************************/
