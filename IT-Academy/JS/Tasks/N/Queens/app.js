function solveQueens() {
  const SIZE = 8;
  let countSolutions = 0;
  let queens = [];
  let grid = [];
  for (let i = 0; i < SIZE; i++) queens[i] = 0;
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
  solve(0);
  return { countSolutions: countSolutions, queens: grid };
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

let solution = solveQueens();
alert("Количество решений - " + solution.countSolutions);
document.getElementById("call__new").addEventListener("click", function() {
    let n = +prompt("Номер расстановки: ");
    if(n < 1) n = 1;
    n %= solution.countSolutions;
    try {
        document.body.appendChild(buildBoard(translator(solution.queens[n-1])));
    } catch(e) {
      alert("Вы ввели некорректные данные!");
    }
    
    return true;
});

