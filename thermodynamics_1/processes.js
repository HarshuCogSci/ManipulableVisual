function adiabaticProcess(){
  var temp_Constant = null, tempScale = null, temp_par = null;
  var pressure_array = [], volume_array = [], temperature_array = [];

  // When state 1 is completely known, 1 parameter of state 2 is known
  if(state_1_known_count == 2 && state_2_known_count == 1){
    for(par in state_2_known){ if(state_2_known[par] == true){ temp_par = par }; }

    // If pressure change is known
    if(temp_par == 'p'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.p, state_2.p]);
      pressure_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_1.p*Math.pow(state_1.v, γ_air);
      volume_array = numeric.pow( numeric.div(temp_Constant, pressure_array), (1/γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If volume change is known
    if(temp_par == 'v'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.v, state_2.v]);
      volume_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_1.p*Math.pow(state_1.v, γ_air);
      pressure_array = numeric.div( temp_Constant, numeric.pow(volume_array, γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If temperature change is known
    if(temp_par == 'T'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.T, state_2.T]);
      temperature_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_1.T*Math.pow(state_1.v, γ_air-1);
      volume_array = numeric.pow( numeric.div(temp_Constant, temperature_array), 1/(γ_air-1) );
      pressure_array = getPressureArray(volume_array, temperature_array);
    }
  }

  // When state 2 is completely known, 1 parameter of state 1 is known
  if(state_2_known_count == 2 && state_1_known_count == 1){
    for(par in state_1_known){ if(state_1_known[par] == true){ temp_par = par }; }

    // If pressure change is known
    if(temp_par == 'p'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.p, state_2.p]);
      pressure_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_2.p*Math.pow(state_2.v, γ_air);
      volume_array = numeric.pow( numeric.div(temp_Constant, pressure_array), (1/γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If volume change is known
    if(temp_par == 'v'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.v, state_2.v]);
      volume_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_2.p*Math.pow(state_2.v, γ_air);
      pressure_array = numeric.div( temp_Constant, numeric.pow(volume_array, γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If temperature change is known
    if(temp_par == 'T'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.T, state_2.T]);
      temperature_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_2.T*Math.pow(state_2.v, γ_air-1);
      volume_array = numeric.pow( numeric.div(temp_Constant, temperature_array), 1/(γ_air-1) );
      pressure_array = getPressureArray(volume_array, temperature_array);
    }
  }

  // Assigning states to process_1_2_states
  process_1_2_states = [];
  process_1_2_states = pressure_array.map(d => { return { p: d } });
  process_1_2_states.forEach((d, i) => { d.v = volume_array[i] });
  process_1_2_states.forEach((d, i) => { d.T = temperature_array[i] });
}

/**************************************************************************************/

function isothermalProcess(){
  var temp_Constant = null, tempScale = null, temp_par = null;
  var pressure_array = [], volume_array = [], temperature_array = [];

  // When state 1 is completely known, 1 parameter of state 2 is known
  if(state_1_known_count == 2 && state_2_known_count == 1){
    for(par in state_2_known){ if(state_2_known[par] == true){ temp_par = par }; }

    // If pressure change is known
    if(temp_par == 'p'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.p, state_2.p]);
      pressure_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_1.p*Math.pow(state_1.v, γ_air);
      volume_array = numeric.pow( numeric.div(temp_Constant, pressure_array), (1/γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If volume change is known
    if(temp_par == 'v'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.v, state_2.v]);
      volume_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_1.p*Math.pow(state_1.v, γ_air);
      pressure_array = numeric.div( temp_Constant, numeric.pow(volume_array, γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If temperature change is known
    if(temp_par == 'T'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.T, state_2.T]);
      temperature_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_1.T*Math.pow(state_1.v, γ_air-1);
      volume_array = numeric.pow( numeric.div(temp_Constant, temperature_array), 1/(γ_air-1) );
      pressure_array = getPressureArray(volume_array, temperature_array);
    }
  }

  // When state 2 is completely known, 1 parameter of state 1 is known
  if(state_2_known_count == 2 && state_1_known_count == 1){
    for(par in state_1_known){ if(state_1_known[par] == true){ temp_par = par }; }

    // If pressure change is known
    if(temp_par == 'p'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.p, state_2.p]);
      pressure_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_2.p*Math.pow(state_2.v, γ_air);
      volume_array = numeric.pow( numeric.div(temp_Constant, pressure_array), (1/γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If volume change is known
    if(temp_par == 'v'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.v, state_2.v]);
      volume_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_2.p*Math.pow(state_2.v, γ_air);
      pressure_array = numeric.div( temp_Constant, numeric.pow(volume_array, γ_air) );
      temperature_array = getTemperatureArray(pressure_array, volume_array);
    }

    // If temperature change is known
    if(temp_par == 'T'){
      tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([state_1.T, state_2.T]);
      temperature_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

      temp_Constant = state_2.T*Math.pow(state_2.v, γ_air-1);
      volume_array = numeric.pow( numeric.div(temp_Constant, temperature_array), 1/(γ_air-1) );
      pressure_array = getPressureArray(volume_array, temperature_array);
    }
  }

  // Assigning states to process_1_2_states
  process_1_2_states = [];
  process_1_2_states = pressure_array.map(d => { return { p: d } });
  process_1_2_states.forEach((d, i) => { d.v = volume_array[i] });
  process_1_2_states.forEach((d, i) => { d.T = temperature_array[i] });
}
