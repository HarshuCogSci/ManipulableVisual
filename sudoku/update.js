// ************************************************************************************** //
// Assign selected

function assign_selected_to_cells(){
  data_cells.forEach(d => { d.selected = false; })
  if(current_active_cell != null){
    data_cells.forEach(d => { if(current_active_cell.id == d.id){ d.selected = true; } })
  }
}

// ************************************************************************************** //
// Assign highlighted

function assign_highlighted_to_cells(){
  data_cells.forEach(d => { d.highlighted = false; })
  if(current_highlighting_value != null && highlighting_allowed == true){
    data_cells.forEach(d => {
      if(d.value == current_highlighting_value){
        data_cells.forEach(d_ => { if(d_.x == d.x || d_.y == d.y || d_.square == d.square || d_.fixed == true){ d_.highlighted = true; } });
      }
    })
    return
  }

  if(current_highlighting_value != null && highlighting_allowed == false){
    data_cells.forEach(d => {
      if(d.value == current_highlighting_value){ d.highlighted = true; }
    })
  }
}

// ************************************************************************************** //
// Check possible values for each cell

function check_possible_values(){
  var temp_arr = [];
  data_cells.forEach(d => {
    temp_arr = []; d.possible_values = [];
    if(d.value == null){

      data_cells.forEach(d_ => {
        if(d_.x == d.x || d_.y == d.y || d_.square == d.square && d_.value != null){
          if( temp_arr.indexOf(d_.value) == -1 ){ temp_arr.push(d_.value); }
        }
      })

      d3.range(1,10).forEach(d_ => {
        if(temp_arr.indexOf(d_) == -1){ d.possible_values.push(d_); }
      })

    }
  })
}

// ************************************************************************************** //
// Update

function update(){
  check_possible_values();
  update_controls();

  assign_selected_to_cells();
  assign_highlighted_to_cells();
  update_Cells();
  update_cells_possibilities();
}

// ************************************************************************************** //
// Update cells Possibilities

function update_cells_possibilities(){
  data_cells.forEach(d => { d.possible_values_text.forEach(d_ => { d_.text(null); }) });

  if(show_possibilities == true){
    data_cells.forEach(d => {
      if(d.value == null){
        var temp_arr = d.possible_values;
        temp_arr.forEach((d_,i) => {
          d.possible_values_text[ 9-temp_arr.length+i ].text(d_);
        })
      }
    })
  }

  if(guess_on == true){
    data_cells.forEach(d => {
      if(d.value == null){
        var temp_arr = d.guesses;
        temp_arr.forEach((d_,i) => {
          d.possible_values_text[ 9-temp_arr.length+i ].text(d_);
        })
      }
    })
  }

}

// ************************************************************************************** //
// Update cells

function update_Cells(){
  data_cells.forEach(d => {
    d.box_text.text(d.value); // Assign the value

    // ***************  Fixed Cells ********************* //

    if(d.fixed == true && d.highlighted == false){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': '#e8e8e8', 'opacity': 1 });
      d.box_text.styles({ 'fill': '#222', 'opacity': 1 });
      return
    }

    if(d.fixed == true && d.highlighted == true && highlighting_allowed == false){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': '#006400', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.fixed == true && d.highlighted == true && d.value != current_highlighting_value){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': '#E7E7E7', 'opacity': 1 });
      d.box_text.styles({ 'fill': '#222', 'opacity': 1 });
      return
    }

    if(d.fixed == true && d.highlighted == true && d.value == current_highlighting_value){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': '#006400', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    // ***************  Empty Cells ********************* //

    if(d.value == null && d.highlighted == false && d.selected == false){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value == null && d.highlighted == false && d.selected == true){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': '#dd9022', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value == null && d.highlighted == true && d.selected == false){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': 'white', 'opacity': 0 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value == null && d.highlighted == true && d.selected == true){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': '#dd9022', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    // ***************  non-Empty Cells ********************* //

    if(d.value != null && d.highlighted == false && d.selected == false){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_text.styles({ 'fill': '#222', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == false && d.selected == true){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': '#dd9022', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == true && highlighting_allowed == false && d.selected == false){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': 'purple', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == true && highlighting_allowed == false && d.selected == true){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': '#dd9022', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == true && d.value != current_highlighting_value && d.selected == false){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': 'white', 'opacity': 0 });
      d.box_text.styles({ 'fill': 'black', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == true && d.value == current_highlighting_value && d.selected == false){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': 'purple', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == true && d.selected == true){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': '#dd9022', 'opacity': 1 });
      d.box_text.styles({ 'fill': 'white', 'opacity': 1 });
      return
    }

  })
}
