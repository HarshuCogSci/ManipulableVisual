// ************************************************************************************** //
// Assign sudoku

function assignSudoku(sudoku){
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      var cell = data_cells[i*9 + j];
      cell.value = null; cell.fixed = false; cell.selected = false; cell.highlighted = false;
      if(sudoku[i][j] != 0){ cell.value = sudoku[i][j]; cell.fixed = true; }
    }
  }
  update_Cells();
}

// ************************************************************************************** //
// Sudoku List

var sudoku_1 = [
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
