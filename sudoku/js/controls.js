// ************************************************************************************** //
// Create controls

function createControls(){
  var temp_l = canvas_size/6;
  var controls_g = d3.select('#canvas').append('g').attrs({ 'transform': 'translate(' +50+ ',' +(canvas_size+50+20)+ ')' });
  var icon_size = 30;

  // Value buttons
  for(var i = 1; i <= 10; i++){
    var temp_y = i <= 5 ? 30 : 90;
    var temp_x = i <= 5 ? i : i-5;

    var controls_bg = controls_g.append('circle').attrs({ cx: temp_x*temp_l, cy: temp_y, r: 25, class: 'controls_bg' });
    var controls_text = controls_g.append('text').attrs({ x: temp_x*temp_l, y: temp_y-5, class: 'controls_text' }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1.2em' }).text(i);
    var controls_text_count = controls_g.append('text').attrs({ x: temp_x*temp_l, y: temp_y+12 }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '0.8em', 'fill': 'gray' }).text(i);
    var controls_fg = controls_g.append('circle').attrs({ cx: temp_x*temp_l, cy: temp_y, r: 25, class: 'controls_fg' }).styles({ 'fill': 'white', 'opacity': 0 });

    var temp_data = { value: i, controls_bg: controls_bg, controls_text: controls_text, controls_text_count: controls_text_count, controls_fg: controls_fg };
    controls_fg.data([ temp_data ]);
    data_controls.push(temp_data);
  }

  data_controls[9].controls_text.attrs({ y: 90 });

  // Guess icon
  var guess_g = controls_g.append('g').attrs({ transform: 'translate(' +0.2*canvas_size+ ',' +160+ ')' });
  guess_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'guess_icon_circle_bg' });
  guess_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: '../assets/question.svg', id: 'guess_icon' });
  guess_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'guess_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });
  guess_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1em', 'fill': 'gray' }).text('Guess');

  // Highlight icon
  var highlight_g = controls_g.append('g').attrs({ transform: 'translate(' +0.5*canvas_size+ ',' +160+ ')' });
  highlight_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'highlight_icon_circle_bg' });
  highlight_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: '../assets/pencil.svg', id: 'highlight_icon' });
  highlight_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'highlight_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });
  highlight_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1em', 'fill': 'gray' }).text('Highlight Cells');

  // List icon
  var list_g = controls_g.append('g').attrs({ transform: 'translate(' +0.8*canvas_size+ ',' +160+ ')' });
  list_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'list_icon_circle_bg' });
  list_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: '../assets/list-empty.png', id: 'list_icon' });
  list_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'list_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });
  list_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1em', 'fill': 'gray' }).text('Possible Values');

  // Undo icon
  var undo_g = controls_g.append('g').attrs({ transform: 'translate(' +0.25*canvas_size+ ',' +260+ ')' });
  undo_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'undo_icon_circle_bg' }).styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
  undo_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: '../assets/undo-alt.svg', id: 'undo_icon' });
  undo_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'undo_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });
  undo_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1em', 'fill': 'gray' }).text('Undo');

  // Reset icon
  var reset_g = controls_g.append('g').attrs({ transform: 'translate(' +0.5*canvas_size+ ',' +260+ ')' });
  reset_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'reset_icon_circle_bg' }).styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
  reset_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: '../assets/reset-alt.svg', id: 'reset_icon' });
  reset_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'reset_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });
  reset_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1em', 'fill': 'gray' }).text('Reset');

  // New icon
  var new_g = controls_g.append('g').attrs({ transform: 'translate(' +0.75*canvas_size+ ',' +260+ ')' });
  new_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'new_icon_circle_bg' }).styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
  new_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: '../assets/new-alt.svg', id: 'new_icon' });
  new_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'new_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });
  new_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1em', 'fill': 'gray' }).text('New');

  var lastNode = data_controls[ data_controls.length-1 ];
  lastNode.value = 'X'; lastNode.controls_text.text('X');
}

// ************************************************************************************** //
// Create controls events

function createControls_Events(){

  // Value buttons
  d3.selectAll('.controls_fg').on('click', function(d){
    if(current_active_cell != null && guess_on == false){
      current_active_cell.value = d.value == 'X' ? null : d.value;
      current_active_cell = null;
      push_data();
      update();
      return
    }

    if(current_active_cell != null && guess_on == true){
      if(current_active_cell.guesses.indexOf(d.value) == -1){ current_active_cell.guesses.push(d.value); }
      else{ current_active_cell.guesses.splice(current_active_cell.guesses.indexOf(d.value), 1); }
      if(d.value == 'X'){ current_active_cell.guesses = []; }
      current_active_cell = null;
      update();
      return
    }

    if(current_active_cell == null){
      if(current_highlighting_value == null){ current_highlighting_value = d.value; }
      else{
        if(current_highlighting_value == d.value){ current_highlighting_value = null; } else{ current_highlighting_value = d.value; }
      }
      update();
    }

  })

  // Key Press events
  d3.select('body').on('keypress', function(){
    if(current_active_cell != null && guess_on == false){
      if(d3.event.charCode == 48){
        current_active_cell.value = null;
        current_active_cell = null;
        push_data();
        update();
      }
      if(d3.event.charCode >= 49 && d3.event.charCode <= 57){
        current_active_cell.value = parseInt(d3.event.key);
        current_active_cell = null;
        push_data();
        update();
      }
    }

    if(current_active_cell != null && guess_on == true){
      if(d3.event.charCode == 48){ current_active_cell.guesses = []; }
      if(d3.event.charCode >= 49 && d3.event.charCode <= 57){
        if(current_active_cell.guesses.indexOf(d3.event.key) == -1){ current_active_cell.guesses.push(d3.event.key); }
        else{ current_active_cell.guesses.splice(current_active_cell.guesses.indexOf(d3.event.key), 1); }
      }
      current_active_cell = null;
      update();
      return
    }

  })

  // Guess icon
  d3.select('#guess_icon_circle_fg').on('click', function(){
    guess_on = !guess_on;
    show_possibilities = false;
    update();
  })

  // Highlight icon
  d3.select('#highlight_icon_circle_fg').on('click', function(){
    highlighting_allowed = !highlighting_allowed;
    // current_highlighting_value = null;
    update();
  })

  d3.select('#list_icon_circle_fg').on('click', function(){
    show_possibilities = !show_possibilities;
    guess_on = false;
    update();
  })

  d3.select('#undo_icon_circle_fg').on('click', function(){
    pop_data();
  })

  d3.select('#reset_icon_circle_fg').on('click', function(){
    reset();
  })

  d3.select('#new_icon_circle_fg').on('click', function(){
    select_sudoku();
  })

}

// ************************************************************************************** //
// Create controls events

function update_controls(){
  if(guess_on == true){
    d3.select('#guess_icon_circle_bg').styles({ 'fill': '#222', 'stroke': '#222', 'stroke-width': 2 });
    d3.select('#guess_icon').attrs({ href: '../assets/question-white.svg' });
  } else {
    d3.select('#guess_icon_circle_bg').styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    d3.select('#guess_icon').attrs({ href: '../assets/question.svg' });
  }

  if(highlighting_allowed == true){
    d3.select('#highlight_icon_circle_bg').styles({ 'fill': '#222', 'stroke': '#222', 'stroke-width': 2 });
    d3.select('#highlight_icon').attrs({ href: '../assets/pencil-white.svg' });
  } else {
    d3.select('#highlight_icon_circle_bg').styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    d3.select('#highlight_icon').attrs({ href: '../assets/pencil.svg' });
  }

  if(show_possibilities == true){
    d3.select('#list_icon_circle_bg').styles({ 'fill': '#BBB', 'stroke': '#222', 'stroke-width': 2 });
    d3.select('#list_icon').attrs({ href: '../assets/list-filled.png' });
  } else {
    d3.select('#list_icon_circle_bg').styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    d3.select('#list_icon').attrs({ href: '../assets/list-empty.png' });
  }

  if(user_data.length > 1){
    d3.select('#undo_icon').attrs({ href: '../assets/undo-alt.svg' });
    d3.select('#undo_icon_circle_bg').styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
  } else{
    d3.select('#undo_icon').attrs({ href: '../assets/undo-gray.svg' });
    d3.select('#undo_icon_circle_bg').styles({ 'fill': 'white', 'stroke': 'gray', 'stroke-width': 2 });
  }

  var temp_count = d3.range(9).map(d => { return 0 });
  data_cells.forEach(d => { if(d.value != null){ temp_count[d.value-1]++; } })
  temp_count.forEach((d,i) => { data_controls[i].controls_text_count.text(9-d); });
  data_controls[9].controls_text_count.text(null);
}
