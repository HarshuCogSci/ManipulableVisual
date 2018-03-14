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
  if(current_highlighting_cell != null && highlighting_allowed == true){
    data_cells.forEach(d => {
      if(d.value == current_highlighting_cell.value && d.value != null){
        data_cells.forEach(d_ => { if(d_.x == d.x || d_.y == d.y || d_.square == d.square || d_.fixed == true){ d_.highlighted = true; } })
      }
    })
  }
}

// ************************************************************************************** //
// Update cells

function update_Cells(){
  assign_selected_to_cells();
  assign_highlighted_to_cells();

  data_cells.forEach(d => {
    d.box_text.text(d.value); // Assign the value

    // ***************  Fixed Cells ********************* //

    if(d.fixed == true && d.highlighted == false){
      d.box_bg.styles({ 'fill': 'white', 'opacity': 1 });
      d.box_circle.styles({ 'fill': '#e8e8e8', 'opacity': 1 });
      d.box_text.styles({ 'fill': '#222', 'opacity': 1 });
      return
    }

    if(d.fixed == true && d.highlighted == true && d.value != current_highlighting_cell.value){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': '#E7E7E7', 'opacity': 1 });
      d.box_text.styles({ 'fill': '#222', 'opacity': 1 });
      return
    }

    if(d.fixed == true && d.highlighted == true && d.value == current_highlighting_cell.value){
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

    if(d.value != null && d.highlighted == true && d.value != current_highlighting_cell.value && d.selected == false){
      d.box_bg.styles({ 'fill': '#3ea3a3', 'opacity': 0.8 });
      d.box_circle.styles({ 'fill': 'white', 'opacity': 0 });
      d.box_text.styles({ 'fill': 'black', 'opacity': 1 });
      return
    }

    if(d.value != null && d.highlighted == true && d.value == current_highlighting_cell.value && d.selected == false){
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
