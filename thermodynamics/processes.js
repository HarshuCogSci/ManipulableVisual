/*******************************************************************************************/
// Thermodynamic Processes

function adiabaticProcess(s1, s2){
  var temp_states = [], pressure_array = [], volume_array = [], temperature_array = [];

  if(s2.p != null){
    var tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([s1.p, s2.p]);
    pressure_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

    var temp_Constant = s1.p*Math.pow(s1.v, γ_air);
    volume_array = numeric.pow( numeric.div(temp_Constant, pressure_array), (1/γ_air) );
    temperature_array = getTemperatureArray(pressure_array, volume_array);
  }

  if(s2.v != null){
    var tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([s1.v, s2.v]);
    volume_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

    var temp_Constant = s1.p*Math.pow(s1.v, γ_air);
    pressure_array = numeric.div( temp_Constant, numeric.pow(volume_array, γ_air) );
    temperature_array = getTemperatureArray(pressure_array, volume_array);
  }

  if(s2.T != null){
    var tempScale = d3.scaleLinear().domain([0, num_Points-1]).range([s1.T, s2.T]);
    temperature_array = d3.range(num_Points).map((d,i) => { return tempScale(i) });

    var temp_Constant = s1.T*Math.pow(s1.v, γ_air-1);
    volume_array = numeric.pow( numeric.div(temp_Constant, temperature_array), 1/(γ_air-1) );
    pressure_array = getPressureArray(volume_array, temperature_array);
  }

  temp_states = pressure_array.map(d => { return { p: d } });
  temp_states.forEach((d, i) => { d.v = volume_array[i] });
  temp_states.forEach((d, i) => { d.T = temperature_array[i] });
  return temp_states
}

/*******************************************************************************************/
