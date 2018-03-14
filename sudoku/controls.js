// ************************************************************************************** //
// Create controls

function createControls(){
  var temp_l = canvas_size/6;
  var controls_g = d3.select('#canvas').append('g').attrs({ 'transform': 'translate(' +50+ ',' +(canvas_size+50+20)+ ')' });
  var icon_size = 30;

  // Guess icon
  var guess_g = controls_g.append('g').attrs({ transform: 'translate(' +0.33*canvas_size+ ',' +160+ ')' });
  guess_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'guess_icon_circle_bg', class: 'unselected' });
  guess_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: 'assets/question.svg', id: 'guess_icon' });
  guess_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'guess_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });

  // Highlight icon
  var highlight_g = controls_g.append('g').attrs({ transform: 'translate(' +0.66*canvas_size+ ',' +160+ ')' });
  highlight_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'highlight_icon_circle_bg', class: 'unselected' });
  highlight_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: 'assets/pencil.svg', id: 'highlight_icon' });
  highlight_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size, id: 'highlight_icon_circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });

  // Value buttons
  for(var i = 1; i <= 10; i++){
    var temp_y = i <= 5 ? 30 : 90;
    var temp_x = i <= 5 ? i : i-5;

    var controls_bg = controls_g.append('circle').attrs({ cx: temp_x*temp_l, cy: temp_y, r: 25, class: 'controls_bg' }).styles({ 'fill': '#CCC' });
    var controls_text = controls_g.append('text').attrs({ x: temp_x*temp_l, y: temp_y, class: 'controls_text' }).styles({ 'dominant-baseline': 'middle', 'text-anchor': 'middle', 'font-size': '1.2em' }).text(i);
    var controls_fg = controls_g.append('circle').attrs({ cx: temp_x*temp_l, cy: temp_y, r: 25, class: 'controls_fg' }).styles({ 'fill': 'white', 'opacity': 0 });

    var temp_data = { value: i, controls_bg: controls_bg, controls_text: controls_text, controls_fg: controls_fg };
    controls_fg.data([ temp_data ]);
    data_controls.push(temp_data);
  }

  var lastNode = data_controls[ data_controls.length-1 ];
  lastNode.value = 'X'; lastNode.controls_text.text('X');

  update_controls();
}

// ************************************************************************************** //
// Create controls events

function createControls_Events(){
  // Value buttons
  d3.selectAll('.controls_fg').on('click', function(d){
    if(current_active_cell != null){
      current_active_cell.value = d.value == 'X' ? null : d.value;
      current_active_cell = null;
      update_Cells();
      return
    }

    if(current_active_cell == null){
      if(current_highlighting_cell == null){ current_highlighting_cell = d; }
      else{
        if(current_highlighting_cell.value == d.value){ current_highlighting_cell = null; }
        else{ current_highlighting_cell = d; }
      }
      update_Cells();
      if(highlighting_allowed == false){ current_highlighting_cell = false; }
    }

  })

  // Key Press events
  d3.select('body').on('keypress', function(){
    if(current_active_cell != null){
      if(d3.event.keyCode == 48){
        current_active_cell.value = null;
        current_active_cell = null;
        update_Cells();
      }
      if(d3.event.keyCode >= 49 && d3.event.keyCode <= 57){
        current_active_cell.value = parseInt(d3.event.key);
        current_active_cell = null;
        update_Cells();
      }
    }
  })

  // Guess icon
  d3.select('#guess_icon_circle_fg').on('click', function(){
    guess_on = !guess_on; update_controls(); update_Cells();
  })

  // Highlight icon
  d3.select('#highlight_icon_circle_fg').on('click', function(){
    highlighting_allowed = !highlighting_allowed;
    current_highlighting_cell = null;
    update_controls(); update_Cells();
  })
}

// ************************************************************************************** //
// Create controls events

function update_controls(){
  if(guess_on == true){
    d3.select('#guess_icon_circle_bg').attrs({ class: 'selected' });
    d3.select('#guess_icon').attrs({ href: 'assets/question-white.svg' });
  } else {
    d3.select('#guess_icon_circle_bg').attrs({ class: 'unselected' });
    d3.select('#guess_icon').attrs({ href: 'assets/question.svg' });
  }

  if(highlighting_allowed == true){
    d3.select('#highlight_icon_circle_bg').attrs({ class: 'selected' });
    d3.select('#highlight_icon').attrs({ href: 'assets/pencil-white.svg' });
  } else {
    d3.select('#highlight_icon_circle_bg').attrs({ class: 'unselected' });
    d3.select('#highlight_icon').attrs({ href: 'assets/pencil.svg' });
  }
}
