/*******************************************************************************************/
// Graph functions

var lineGen = d3.line().x(function(d){ return d.x }).y(function(d){ return d.y });
var xScale = d3.scaleLinear(), yScale = d3.scaleLinear(),
    xVar = null, yVar = null;

/*************************************************/

function createGraph(){
  d3.select('#origin').remove();

  var graph = d3.select('#graph');
  var width = parseInt(graph.style('width'));
  var height = parseInt(graph.style('height'));

  yVar = document.getElementById('yAxis_var').value;
  xVar = document.getElementById('xAxis_var').value;

  var origin = graph.append('g').attrs({ id: 'origin', transform: 'translate(' +50+ ',' +(height-50)+ ')' });
  xScale.domain([parameters[xVar].min, parameters[xVar].max]).range([0, width-100]);
  yScale.domain([parameters[yVar].min, parameters[yVar].max]).range([0, -(height-100)]);

  origin.append('g').call( d3.axisBottom(xScale) );
  origin.append('g').call( d3.axisLeft(yScale) );

  origin.append('text').attrs({ class: 'axes_label', 'transform': 'translate(' +(0.8*(width-100))+ ',' +30+ ')' }).text(parameters[xVar].name + ' →')
  origin.append('g').attrs({ class: 'axes_label', 'transform': 'translate(' +-40+ ',' +(-0.8*(height-100))+ ') rotate(-90)' })
        .append('text').text(parameters[yVar].name + ' →');

  origin.append('path').attrs({ id: 'graph_path' }).styles({ 'stroke': '#03a9f4', 'stroke-width': 2, 'fill': 'none' });

  origin.append('circle').attrs({ id: 'p1_circle', r: 4 }).styles({ 'fill': 'red', 'cursor': 'hand' }).data([{ color: 'red', state: state_1 }]);
  origin.append('text').attrs({ class: 'axes_label', id: 'p1_text' }).styles({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }).text(1);

  origin.append('circle').attrs({ id: 'p2_circle', r: 4 }).styles({ 'fill': 'green', 'cursor': 'hand' }).data([{ color: 'green', state: state_1 }]);
  origin.append('text').attrs({ class: 'axes_label', id: 'p2_text' }).styles({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }).text(2);

  for(i = 0; i < 3; i++){
    origin.append('g').attrs({ id: 'g' + i, class: 'hidden' }).data([{}]);
    d3.select('#g' + i).append('circle').attrs({ r: 4 }).styles({ 'fill': 'gray', 'cursor': 'hand' });
    d3.select('#g' + i).append('line').styles({ 'stroke': 'gray', 'stroke-dasharray': '3,3' });
  }

  updateGraph();
  setVisibility_Pointers();
  create_GraphVar_Change_Event();
}

/*************************************************/

function updateGraph(){
  var graph_data = process_1_2_states.map(d => { return { x: xScale(d[xVar]), y: yScale(d[yVar]) } });
  d3.select('#graph_path').attrs({ d: lineGen(graph_data) });

  d3.select('#p1_circle').attrs({ cx: xScale(state_1[xVar]), cy: yScale(state_1[yVar]) });
  d3.select('#p1_text').attrs({ transform: 'translate(' +(xScale(state_1[xVar])+10)+ ',' +(yScale(state_1[yVar])-10)+ ')' })

  d3.select('#p2_circle').attrs({ cx: xScale(state_2[xVar]), cy: yScale(state_2[yVar]) });
  d3.select('#p2_text').attrs({ transform: 'translate(' +(xScale(state_2[xVar])+10)+ ',' +(yScale(state_2[yVar])-10)+ ')' })

  // Values of pointers
  d3.selectAll('.shown').each(function(d){
    var state = d.state, par = d.par;
    if(par == xVar){
      d3.select(this).select('circle').attrs({ cx: xScale(state[xVar]), cy: yScale(0) });
      d3.select(this).select('line').attrs({ x1: xScale(state[xVar]), y1: yScale(state[yVar]), x2: xScale(state[xVar]), y2: yScale(0) });
    }
    if(par == yVar){
      d3.select(this).select('circle').attrs({ cx: xScale(0), cy: yScale(state[yVar]) });
      d3.select(this).select('line').attrs({ x1: xScale(state[xVar]), y1: yScale(state[yVar]), x2: xScale(0), y2: yScale(state[yVar]) });
    }
  })
}

/*************************************************/

function create_GraphVar_Change_Event(){
  d3.select('#xAxis_var').on('change', function(){ createGraph(); })
  d3.select('#yAxis_var').on('change', function(){ createGraph(); })
}

/*************************************************/

function setVisibility_Pointers(){
  d3.selectAll('.shown').attrs({ class: 'hidden' }).data([{}]);

  if(state_1_known_count == 2){
    for(par in state_1_known){
       if(state_1_known[par] == true && (par == xVar || par == yVar)){ d3.select('.hidden').attrs({ class: 'shown' }).data([{ par: par, state: state_1 }]); }
     }
     if(state_2_known_count == 1){
       for(par in state_2_known){
          if(state_2_known[par] == true && (par == xVar || par == yVar)){ d3.select('.hidden').attrs({ class: 'shown' }).data([{ par: par, state: state_2 }]) }
        }
     }
  }

  if(state_2_known_count == 2){
    for(par in state_2_known){
       if(state_2_known[par] == true && (par == xVar || par == yVar)){ d3.select('.hidden').attrs({ class: 'shown' }).data([{ par: par, state: state_2 }]) }
     }
     if(state_1_known_count == 1){
       for(par in state_1_known){
          if(state_1_known[par] == true && (par == xVar || par == yVar)){ d3.select('.hidden').attrs({ class: 'shown' }).data([{ par: par, state: state_1 }]) }
        }
     }
  }

}
