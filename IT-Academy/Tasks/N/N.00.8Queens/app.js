function solveQueens(n) {
  const SIZE = 8;
  let countSolutions = 0;
  var queens = [];
  var grid = [];
  for (var c = 0; c < SIZE; c++) queens[c] = 0;
  function solve(n) {
    if (n >= SIZE) {
      grid.push(queens.slice());
      countSolutions++;
      return true;
    }
    for (var r = 0; r < SIZE; r++) {
      for (c = 0; c < n; c++)
        if (queens[c] === r || Math.abs(queens[c] - r) === n - c) break;
      if (c === n) {
        queens[n] = r;
        solve(n + 1);
      }
    }
  }
  function translator(grid) {
    let result = [];
    for (let i = 0; i < grid.length; i++) {
      result.push([i, grid[i]]);
    }
    result.sort((elem1, elem2) => {
      return elem1[1] - elem2[1];
    });
    return result;
  }
  solve(0);
  n %= countSolutions;
  if(n<1) n = 1;
  return { countSolutions: countSolutions, queens: translator(grid[n - 1]) };
}
function buildBoard(grid) {
  const SIZE = 8;
  function cE(className) {
    let elem = document.createElement("div");
    elem.classList.add(className);
    return elem;
  }
  function dE(className) {
    let elem = document.querySelector(className);
    if(elem) elem.remove();
    return false;
  }
  dE(".board");
  let k = 0;
  let board = cE("board");
  for (let i = 0; i < SIZE; i++) {
    let row = cE("row");
    for (let j = 0; j < SIZE; j++) {
      let column = cE("column");
      if (grid[i][0] == j) {
        let queen = cE("queen");
        column.appendChild(queen);
      }
      row.appendChild(column);
    }
    board.appendChild(row);
  }
  return board;
}

document.getElementById("state-board").addEventListener("change", function() {
  function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
  if(!isNumber(this.value)) { alert("Введите число"); return false; }
  let solution = solveQueens(+this.value);
  document.body.appendChild(buildBoard(solution.queens));
  console.log("Количество решений: " + solution.countSolutions);
});