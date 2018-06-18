function user_input(x){
    number_of_needles=+x.value;
    setup();
    
    a=a+number_of_needles;
    m=is_intersecting(needle_array);
    
    var l=m/a;

    q=(2*100)/(100*l);

    num_needles_array.push(a);
    pi_value_array.push(q);
    
    result();
}

function input0() {
    var x= document.getElementsByClassName("btn")[0];
    user_input(x);
}


function input1(){
    var x= document.getElementsByClassName("btn")[1];
    user_input(x);
}


function input2(){
    var x= document.getElementsByClassName("btn")[2];
    user_input(x);
}

function input3(){
    var x= document.getElementById("drop");
    w=Number.isInteger(+x.value)
    //e=if(+x.value>0){};
    if(w ){
        if(+x.value>0)
        user_input(x);
        else
            alert("INVALID NUMBER OF NEEDLES");
    }
    else 
        alert("(@_@) Enter POSITIVE INTEGERS ONLY");
}


 
   