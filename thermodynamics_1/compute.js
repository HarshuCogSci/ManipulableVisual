/********************************************************************************/
// Compute Function

  function compute(){
    compute_state();
    if(process == 'Adiabatic'){ adiabaticProcess(); }
    if(process == 'Isothermal'){ isothermalProcess(); }

    if(process_1_2_states.length > 0){
      state_1.p  = process_1_2_states[0].p;
      state_1.v  = process_1_2_states[0].v;
      state_1.T  = process_1_2_states[0].T;

      state_2.p  = process_1_2_states.last().p;
      state_2.v  = process_1_2_states.last().v;
      state_2.T  = process_1_2_states.last().T;
    }
  }

  /*************************************/

  function compute_state(){
    var temp_par = null;
    if(state_1_known_count == 2){
      for(par in state_1_known){ if(state_1_known[par] == false){ temp_par = par; } }
      if(temp_par == 'p'){ state_1.p = getPressure(state_1.v, state_1.T); }
      if(temp_par == 'v'){ state_1.v = getVolume(state_1.p, state_1.T); }
      if(temp_par == 'T'){ state_1.T = getTemperature(state_1.p, state_1.v); }
    }

    if(state_2_known_count == 2){
      for(par in state_2_known){ if(state_2_known[par] == false){ temp_par = par; } }
      if(temp_par == 'p'){ state_2.p = getPressure(state_2.v, state_2.T); }
      if(temp_par == 'v'){ state_2.v = getVolume(state_2.p, state_2.T); }
      if(temp_par == 'T'){ state_2.T = getTemperature(state_2.p, state_2.v); }
    }
  }
