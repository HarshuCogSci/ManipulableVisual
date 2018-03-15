// ************************************************************************************** //
// Preparing the board

function createBoard(){
  var sudoku_g = d3.select('#canvas').append('g').attrs({ transform: 'translate(' +50+ ',' +50+ ')' });

  // Creating cells
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      var temp_index = i*9 + j;

      var temp_ = sudoku_g.append('rect').attrs({ x: j*box_size, y: i*box_size, width: box_size, height: box_size, class: 'boxes_bg', rx: 0*box_size, ry: 0*box_size }); // 0.25*box_size
      data_cells[temp_index].box_bg = temp_;

      var temp_ = sudoku_g.append('circle').attrs({ cx: (j+0.5)*box_size, cy: (i+0.5)*box_size, r: 0.48*box_size });
      data_cells[temp_index].box_circle = temp_;

      var temp_ = sudoku_g.append('text').attrs({ x: (j+0.5)*box_size, y: (i+0.5)*box_size, class: 'boxes_text' }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': 20 });
      data_cells[temp_index].box_text = temp_;

      var possiblilities_g = sudoku_g.append('g').attrs({ 'transform': 'translate(' +((j+(1/6))*box_size)+ ',' +((i+(1/6))*box_size)+ ')' })
      var temp_arr = [];

      for(var z = 0; z < 9; z++){
        var temp_x = (z%3)*(box_size/3);
        var temp_y = parseInt(z/3)*(box_size/3);
        temp_arr[z] = possiblilities_g.append('text').attrs({ x: temp_x, y: temp_y }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': 11, 'fill': 'gray' });
      }
      data_cells[temp_index].possible_values_text = temp_arr;

      var temp_ = sudoku_g.append('rect').attrs({ x: j*box_size, y: i*box_size, width: box_size, height: box_size, class: 'boxes' }).styles({ fill: 'white', 'opacity': 0 });
      data_cells[temp_index].box = temp_;
    }
  }

  // Data binding
  d3.selectAll('.boxes').data(data_cells);

  // Creating normal lines
  var normal_line_width = 1;
  for(var i = 0; i <= 9; i += 1){
    sudoku_g.append('line').attrs({ x1: 0, x2: canvas_size, y1: i*box_size, y2: i*box_size }).styles({ 'stroke': 'gray', 'stroke-width': normal_line_width });
    sudoku_g.append('line').attrs({ y1: 0, y2: canvas_size, x1: i*box_size, x2: i*box_size }).styles({ 'stroke': 'gray', 'stroke-width': normal_line_width });
  }

  // Creating bold lines
  var bold_line_width = 2;
  for(var i = 0; i <= 9; i += 3){
    sudoku_g.append('line').attrs({ x1: 0, x2: canvas_size, y1: i*box_size, y2: i*box_size }).styles({ 'stroke': 'black', 'stroke-width': bold_line_width });
    sudoku_g.append('line').attrs({ y1: 0, y2: canvas_size, x1: i*box_size, x2: i*box_size }).styles({ 'stroke': 'black', 'stroke-width': bold_line_width });
  }

}

// ************************************************************************************** //
// Creating events for cells

function create_Events_for_Cells(){
  d3.selectAll('.boxes').on('click', function(d){
    if(d.value == null){ click_on_empty_cell(d); return }
    if(d.fixed == true){ click_on_fixed_cell(d); return }
    if(d.value != null && d.fixed == false){ click_on_filled_cell(d); return }
  })
}

// ************************************************************************************** //
// Click Event on an empty cell

function click_on_empty_cell(d){
  if(d.selected == true){ current_active_cell = null; }
  else{ current_active_cell = d; }
  update();
}

// ************************************************************************************** //
// Click Event on a fixed cell

function click_on_fixed_cell(d){
  current_active_cell = null;
  update();
}

// ************************************************************************************** //
// Click Event on a filled cell

function click_on_filled_cell(d){
  if(d.selected == true){ current_active_cell = null; }
  else{ current_active_cell = d; }
  update();
}
