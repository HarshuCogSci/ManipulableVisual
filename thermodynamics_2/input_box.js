var inputBox = new Object();

/********************************************************************************/
// Assign Values to Input Boxes

inputBox.assignValues = function(process){
  for(d in params){
    document.getElementById('s1_' +d+ '_input').value = process.state_1.values[d];
    document.getElementById('s2_' +d+ '_input').value = process.state_2.values[d];
  }
}

/********************************************************************************/
// Activate required input boxes

inputBox.activate = function(process){
  d3.selectAll('.s_input').attrs({ 'disabled': true });
  for(d in params){
    document.getElementById('s1_' +d+ '_input').disabled = process.state_1.inputBox.active[d] == true ? null : true;
    document.getElementById('s2_' +d+ '_input').disabled = process.state_2.inputBox.active[d] == true ? null : true;
  }
}
