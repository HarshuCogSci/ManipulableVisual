/********************************************************************************/
// Adiabatic Process

function adiabatic_process(){
  this.process = 'Adiabatic';
  this.stroke = 'steelblue';

  // State 1 variables
  this.state_1 = {};
  this.state_1.values = { p: ambient.p, v: ambient.v, T: ambient.T };

  this.state_1.checkBox = {};
  this.state_1.checkBox.active = { p: true, v: true, T: true };
  this.state_1.checkBox.checked = { p: false, v: false, T: false };
  this.state_1.checkBox.count = 0;

  this.state_1.inputBox = {};
  this.state_1.inputBox.active = { p: false, v: false, T: false };

  // State 2 variables
  this.state_2 = {};
  this.state_2.values = { p: ambient.p, v: ambient.v, T: ambient.T };

  this.state_2.checkBox = {};
  this.state_2.checkBox.active = { p: true, v: true, T: true };
  this.state_2.checkBox.checked = { p: false, v: false, T: false };
  this.state_2.checkBox.count = 0;

  this.state_2.inputBox = {};
  this.state_2.inputBox.active = { p: false, v: false, T: false };

  // Other variables
  this.known_state = null;
  this.unknown_state = null;
}

/********************************************************************************/
// Update all the checkbox and inputbox varaibles

adiabatic_process.prototype.decide_ux = function(){
  this.updateCounts();
  this.known_state = null; this.unknown_state = null;

  // Check boxes
  for(d in params){ this.state_1.checkBox.active[d] = true; this.state_2.checkBox.active[d] = true; }

  if(this.state_1.checkBox.count == 2){
    this.known_state = 'state_1';
    for(d in params){ if(this.state_1.checkBox.checked[d] == false){ this.state_1.checkBox.active[d] = false } }
    if(this.state_2.checkBox.count == 1){
      this.unknown_state = 'state_2';
      for(d in params){ if(this.state_2.checkBox.checked[d] == false){ this.state_2.checkBox.active[d] = false } }
    }
  }

  if(this.state_2.checkBox.count == 2){
    this.known_state = 'state_2';
    for(d in params){ if(this.state_2.checkBox.checked[d] == false){ this.state_2.checkBox.active[d] = false } }
    if(this.state_1.checkBox.count == 1){
      this.unknown_state = 'state_1';
      for(d in params){ if(this.state_1.checkBox.checked[d] == false){ this.state_1.checkBox.active[d] = false } }
    }
  }

  // Input boxes
  for(d in params){ this.state_1.inputBox.active[d] = false; this.state_2.inputBox.active[d] = false; }

  if(this.state_1.checkBox.count == 2){
    for(d in params){ if(this.state_1.checkBox.checked[d] == true){ this.state_1.inputBox.active[d] = true } }
    if(this.state_2.checkBox.count == 1){
      for(d in params){ if(this.state_2.checkBox.checked[d] == true){ this.state_2.inputBox.active[d] = true } }
    }
  }

  if(this.state_2.checkBox.count == 2){
    for(d in params){ if(this.state_2.checkBox.checked[d] == true){ this.state_2.inputBox.active[d] = true } }
    if(this.state_1.checkBox.count == 1){
      for(d in params){ if(this.state_1.checkBox.checked[d] == true){ this.state_1.inputBox.active[d] = true } }
    }
  }
}

/********************************************************************************/
// Update Counts

adiabatic_process.prototype.updateCounts = function(){
  this.state_1.checkBox.count = 0;
  this.state_2.checkBox.count = 0;
  for(d in params){
    if(this.state_1.checkBox.checked[d] == true){ this.state_1.checkBox.count++; }
    if(this.state_2.checkBox.checked[d] == true){ this.state_2.checkBox.count++; }
  }
}
