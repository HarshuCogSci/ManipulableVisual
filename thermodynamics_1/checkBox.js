/********************************************************************************/
// Functions for Check Boxes

  function create_CheckBox_Events(){
    for(var par in state_1_known){
      d3.select('#s1_' +par+ '_check').on('change', function(){
        var temp_par = d3.select(this).attr('data');
        state_1_known[temp_par] = !state_1_known[temp_par];
        if(state_1_known[temp_par] == true){ state_1_known_count++; } else { state_1_known_count--; }
        checkBox_Event();
        update_Visibility_InputBoxes();
        compute(); update_Values_InputBoxes();
        setVisibility_Pointers(); updateGraph();
      })
    }

    for(var par in state_2_known){
      d3.select('#s2_' +par+ '_check').on('change', function(){
        var temp_par = d3.select(this).attr('data');
        state_2_known[temp_par] = !state_2_known[temp_par];
        if(state_2_known[temp_par] == true){ state_2_known_count++; } else { state_2_known_count--; }
        checkBox_Event();
        update_Visibility_InputBoxes();
        compute(); update_Values_InputBoxes();
        setVisibility_Pointers(); updateGraph();
      })
    }
  }

/*************************************/

  function update_Visibility_CheckBoxes(){
    for(par in state_1_checkBox_active){
      var temp = state_1_checkBox_active[par] == true ? null : true;
      d3.select('#s1_' +par+ '_check').attrs({ disabled: temp });
    }

    for(par in state_2_checkBox_active){
      var temp = state_2_checkBox_active[par] == true ? null : true;
      d3.select('#s2_' +par+ '_check').attrs({ disabled: temp });
    }
  }

/*************************************/

  function uncheck_CheckBoxes(){
    $('input[type=checkbox]').each(function(){
      document.getElementById(this.id).checked = false;
    });
  }

/*************************************/

  function checkBox_Event(){
    if(process == 'Adiabatic'){
      for(par in state_1_known){ state_1_checkBox_active[par] = true; }
      for(par in state_2_known){ state_2_checkBox_active[par] = true; }

      if(state_1_known_count == 2){
        for(par in state_1_known){ if(state_1_known[par] == false){ state_1_checkBox_active[par] = false; } };
        if(state_2_known_count == 1){
          for(par in state_2_known){ if(state_2_known[par] == false){ state_2_checkBox_active[par] = false; } };
        }
      }

      if(state_2_known_count == 2){
        for(par in state_2_known){ if(state_2_known[par] == false){ state_2_checkBox_active[par] = false; } }
        if(state_1_known_count == 1){
          for(par in state_1_known){ if(state_1_known[par] == false){ state_1_checkBox_active[par] = false; } };
        }
      }
    }

    update_Visibility_CheckBoxes();
  }
