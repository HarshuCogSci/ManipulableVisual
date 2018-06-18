

var timer; 



function cbf(){
    var t= document.getElementById("y");
number_of_needles=t.value;
    
    user_input({ value: number_of_needles });
}

function Animate(){
   timer= d3.interval(cbf,500);
    
    
}

//timer.stop();

//timer.restart(callback, 200);  will start timer function
//timer.stop();                  will stop timer function
