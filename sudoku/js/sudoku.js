// ************************************************************************************** //
// Assign sudoku

function assignSudoku(sudoku){
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      var cell = data_cells[i*9 + j];
      cell.value = null; cell.fixed = false; cell.selected = false; cell.highlighted = false;
      if(sudoku[i][j] != 0){ cell.value = sudoku[i][j]; cell.fixed = true; }
      // if(sudoku[i*9 + j].value != 0){ cell.value = sudoku[i*9 + j].value; cell.fixed = true; }
    }
  }
  update_Cells();
}

// ************************************************************************************** //
// Create a sudoku

function createSudoku(){

  sudoku_arr = [];
  for(var i = 1; i <= 9; i++){
    for(var j = 1; j <= 9; j++){
      var temp_x_pos = parseInt((i-1)/3);
      var temp_y_pos = parseInt((j-1)/3);
      var temp_square_pos = temp_x_pos*3 + temp_y_pos;
      var temp_id = (i-1)*9 + j;

      var temp_object = { x: i, y: j, square: temp_square_pos, id: temp_id, value: 0 };
      sudoku_arr.push(temp_object);
    }
  }

  rows = d3.range(10).map(d => { return([]) });
  columns = d3.range(10).map(d => { return([]) });
  squares = d3.range(10).map(d => { return([]) });

  var temp_val = null;
  for(var i = 0; i < sudoku_arr.length; i++){
    temp_val = math.randomInt(1,10);
    sudoku_arr[i].value = assignValue(sudoku_arr[i], temp_val);
  }

  function assignValue(cell, value){
    if( rows[cell.x].indexOf(value) == -1 && columns[cell.y].indexOf(value) == -1 && squares[cell.square].indexOf(value) == -1 ){
      rows[cell.x].push(value); columns[cell.y].push(value); squares[cell.square].push(value);
      return value
    } else {
      console.log(value);
      value++; if(value == 10){ value = 1; }
      return( assignValue(cell, value) );
    }
  }

  assignSudoku(sudoku_arr);
}

// ************************************************************************************** //
// Sudoku List

var sudoku_archive = [];

sudoku_archive[0] = [
  [0,5,3, 0,0,0, 4,0,0],
  [1,0,0, 0,5,6, 0,0,0],
  [0,0,0, 0,1,0, 0,5,0],

  [0,0,8, 0,0,5, 6,0,3],
  [2,0,0, 4,0,0, 0,9,8],
  [6,7,0, 0,0,0, 0,0,0],

  [0,0,7, 0,0,0, 0,0,9],
  [0,2,6, 8,4,0, 0,3,1],
  [0,0,0, 0,0,0, 0,6,0],
];

sudoku_archive[1] = [
  [9,0,0, 7,0,0, 0,6,8],
  [0,2,0, 0,5,9, 5,0,1],
  [6,0,7, 0,3,0, 2,4,0],

  [0,0,0, 0,6,0, 4,5,0],
  [0,0,5, 0,2,0, 0,0,3],
  [0,0,0, 0,0,5, 6,0,0],

  [0,0,0, 0,0,3, 1,2,0],
  [0,1,4, 2,8,0, 0,9,0],
  [0,0,0, 0,7,0, 0,3,0],
];

sudoku_archive[2] = [
  [4,0,0, 0,3,2, 0,0,8],
  [0,7,0, 0,6,1, 0,0,0],
  [0,0,0, 0,0,0, 3,7,0],

  [0,9,2, 1,0,0, 0,0,0],
  [0,4,0, 0,0,0, 5,0,0],
  [0,0,0, 2,0,9, 0,8,0],

  [0,0,0, 0,0,5, 7,0,3],
  [5,0,4, 0,0,0, 0,0,2],
  [0,0,1, 0,0,0, 4,0,0],
];

sudoku_archive[3] = [
  [0,5,0, 0,1,0, 0,0,6],
  [3,0,0, 5,0,8, 0,9,0],
  [0,0,0, 0,0,7, 0,4,0],

  [0,0,0, 0,0,0, 0,2,0],
  [0,9,0, 0,0,3, 1,0,0],
  [0,0,0, 0,0,1, 0,0,9],

  [0,8,0, 3,6,0, 9,0,5],
  [9,2,0, 0,0,0, 0,0,0],
  [6,0,0, 0,7,0, 0,8,0],
];

sudoku_archive[4] = [
  [0,7,0, 0,0,4, 0,0,0],
  [0,0,8, 0,0,3, 2,0,5],
  [5,0,0, 6,0,0, 0,0,0],

  [0,2,0, 0,0,1, 0,0,0],
  [0,8,3, 0,0,2, 1,9,0],
  [6,0,0, 0,0,0, 5,2,0],

  [0,0,0, 1,4,0, 0,0,8],
  [0,0,0, 0,0,0, 0,0,2],
  [9,0,0, 0,0,0, 6,3,1],
];

sudoku_archive[5] = [
  [7,0,2, 0,0,4, 0,0,6],
  [0,3,0, 9,0,8, 0,0,7],
  [0,0,4, 0,0,0, 9,0,1],

  [0,0,0, 0,0,0, 7,0,4],
  [0,0,6, 0,0,0, 3,0,0],
  [0,0,1, 0,9,2, 0,0,0],

  [0,1,0, 0,0,0, 0,0,2],
  [6,2,0, 1,7,9, 4,0,0],
  [0,4,0, 0,8,0, 0,0,0],
];

sudoku_archive[6] = [
  [0,0,7, 0,8,0, 0,0,0],
  [4,0,0, 0,0,0, 0,2,0],
  [0,0,6, 0,0,9, 0,1,0],

  [0,0,0, 0,0,6, 0,0,9],
  [5,7,0, 0,0,0, 0,0,8],
  [0,9,0, 0,5,3, 0,0,0],

  [0,0,0, 5,0,0, 2,0,0],
  [2,0,0, 9,0,0, 0,7,0],
  [0,0,9, 2,0,7, 6,8,0],
];

// sudoku_archive[0] = [
//   [0,0,0, 0,0,0, 0,0,0],
//   [0,0,0, 0,0,0, 0,0,0],
//   [0,0,0, 0,0,0, 0,0,0],

//   [0,0,0, 0,0,0, 0,0,0],
//   [0,0,0, 0,0,0, 0,0,0],
//   [0,0,0, 0,0,0, 0,0,0],

//   [0,0,0, 0,0,0, 0,0,0],
//   [0,0,0, 0,0,0, 0,0,0],
//   [0,0,0, 0,0,0, 0,0,0],
// ];

