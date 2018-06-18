function plot(){          // plot() creates a empty traces(each trace is an object containing x ,y ,type info).
                          
    var trace1 = {
      x: [], 
      y: [], 
      type: 'line'
    };

    var trace2 = {
        x: [],
        y: [],
        type: 'line',
        name: 'PI'
    }

  //  var temp = d3.range(0,10,0.1);
   /* var trace3 = {
        x: temp,
        y: temp.map(d => { return d*d }),
        type: 'line',
        name: 'parabola'
    }
    */
    
    var data = [trace1, trace2];
    myLineChart=Plotly.newPlot('graph', data //, {}, { staticPlot: true }// 
                              );
}


//this updatePlot function updates empty x and y of traces ( here 1st and 2nd trace)
function updatePlot(){
    var data = document.getElementById('graph').data;
    data[0].x = num_needles_array;
    data[0].y = pi_value_array;

    data[1].x = [0, a];
    data[1].y = [0, a].map(d => { return 22.0/7 });
    //.map(d=> {return something}); will return some value for each value i.e for 0 and a here
    
    Plotly.redraw('graph'); ///will redraw the graph with updated values retaining previous trace.
}