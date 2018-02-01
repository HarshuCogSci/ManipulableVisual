/********************************************************************************/
// Functions for the input number boxes

  function update_Visibility_InputBoxes(){
    for(par in state_1_known){ d3.select('#s1_' +par+ '_input').attrs({ disabled: true }); }
    for(par in state_2_known){ d3.select('#s2_' +par+ '_input').attrs({ disabled: true }); }

    if(state_1_known_count == 2 || state_2_known_count == 2){
      for(var par in state_1_known){
        var temp = null;
        if(state_1_known[par] == false){ temp = true; } else { temp = null; }
        d3.select('#s1_' +par+ '_input').attrs({ disabled: temp });
      }

      for(var par in state_2_known){
        var temp = null;
        if(state_2_known[par] == false){ temp = true; } else { temp = null; }
        d3.select('#s2_' +par+ '_input').attrs({ disabled: temp });
      }
    }
  }

  /*************************************/

  function update_Values_InputBoxes(){
    for(var par in state_1){
      d3.select('#s1_' +par+ '_input').attrs({ value: Math.round(state_1[par]*100)/100 });
      $('#s1_' +par+ '_input').val( Math.round(state_1[par]*100)/100 );
    }

    for(var par in state_2){
      d3.select('#s2_' +par+ '_input').attrs({ value: Math.round(state_2[par]*100)/100 });
      $('#s2_' +par+ '_input').val( Math.round(state_2[par]*100)/100 );
    }
  }

  /*************************************/

  function create_InputBox_Events(){
    for(par in  state_1_known){
      d3.select('#s1_' +par+ '_input').on('input', function(){
        var temp_par = d3.select(this).attr('data');
        state_1[temp_par] = this.value;
        compute(); update_Values_InputBoxes(); updateGraph();
      })
    }

    for(par in  state_2_known){
      d3.select('#s2_' +par+ '_input').on('input', function(){
        var temp_par = d3.select(this).attr('data');
        state_2[temp_par] = this.value;
        compute(); update_Values_InputBoxes(); updateGraph();
      })
    }
  }
