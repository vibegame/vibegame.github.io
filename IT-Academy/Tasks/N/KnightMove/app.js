"use strict";
const SIZE = 8;
var start = {
  x: 0,
  y: 0
};

function askChess() {
  let boardAsk = document.createElement("div");
  boardAsk.classList.add("board-ask");
  for(let i=0;i<SIZE;i++) {
    let columnAsk = document.createElement("div");
    columnAsk.classList.add("column-ask");
    for(let j=0;j<SIZE;j++) {
      let rowAsk = document.createElement("div");
      rowAsk.classList.add("row-ask");
      rowAsk.setAttribute("data-x", i);
      rowAsk.setAttribute("data-y", j);
      columnAsk.appendChild(rowAsk);
    }
    boardAsk.appendChild(columnAsk);
  }
  document.body.appendChild(boardAsk);
  boardAsk.onclick = function(e) {
    let target = e.target;
    start.x = +target.getAttribute("data-y");
    start.y = +target.getAttribute("data-x");
    initChess();
    return true;
  }
}
function initChess() {
  var board = document.createElement("div");
  var chess = document.createElement("div");
  board.setAttribute("id", "board");
  chess.setAttribute("id", "chess");
  board.appendChild(chess);
  document.body.replaceChild(board, document.querySelector(".board-ask"));
  // var chess = document.getElementById("chess");
  // var board = document.getElementById("board");
  
  const sizeCell = 74;
  const TRANSITION = 200;
  const DELAY = 200;
  var startPos = {
    x: +chess.offsetLeft,
    y: +chess.offsetTop
  };
  var current = {};
  current.x = start.x;
  current.y = start.y;

  function chessSolution(start) {


    function createGridMoved() {
      for (let i = 0; i < SIZE; i++) {
        gridMoved[i] = [];
        for (let j = 0; j < SIZE; j++) {
          gridMoved[i].push(false);
        }
      }
    }

    function canMove(x, y) {
      function compValue(a, b) {
        return a.value - b.value;
      }
      let ways = [];
      if (x <= 5 && y <= 6 && !gridMoved[x + 2][y + 1]) ways.push({
        x: x + 2,
        y: y + 1,
        value: grid[x + 2][y + 1]
      });
      if (x <= 5 && y >= 1 && !gridMoved[x + 2][y - 1]) ways.push({
        x: x + 2,
        y: y - 1,
        value: grid[x + 2][y - 1]
      });
      if (x >= 2 && y <= 6 && !gridMoved[x - 2][y + 1]) ways.push({
        x: x - 2,
        y: y + 1,
        value: grid[x - 2][y + 1]
      });
      if (x >= 2 && y >= 1 && !gridMoved[x - 2][y - 1]) ways.push({
        x: x - 2,
        y: y - 1,
        value: grid[x - 2][y - 1]
      });
      if (x <= 6 && y <= 5 && !gridMoved[x + 1][y + 2]) ways.push({
        x: x + 1,
        y: y + 2,
        value: grid[x + 1][y + 2]
      });
      if (x >= 1 && y <= 5 && !gridMoved[x - 1][y + 2]) ways.push({
        x: x - 1,
        y: y + 2,
        value: grid[x - 1][y + 2]
      });
      if (x <= 6 && y >= 2 && !gridMoved[x + 1][y - 2]) ways.push({
        x: x + 1,
        y: y - 2,
        value: grid[x + 1][y - 2]
      });
      if (x >= 1 && y >= 2 && !gridMoved[x - 1][y - 2]) ways.push({
        x: x - 1,
        y: y - 2,
        value: grid[x - 1][y - 2]
      });
      ways.sort(compValue);
      return ways;
    }

    function nextCell(x, y) {
      current.x = x;
      current.y = y;
      gridMoved[x][y] = true;
      allWay.push({
        x: x,
        y: y
      });
    }

    function reduceDegree(arr) {
      for (let i = 1; i < arr.length; i++)
        grid[arr[i].x][arr[i].y]--;
    }
    let grid = [
      [2, 3, 4, 4, 4, 4, 3, 2],
      [3, 4, 6, 6, 6, 6, 4, 3],
      [4, 6, 8, 8, 8, 8, 6, 4],
      [4, 6, 8, 8, 8, 8, 6, 4],
      [4, 6, 8, 8, 8, 8, 6, 4],
      [4, 6, 8, 8, 8, 8, 6, 4],
      [3, 4, 6, 6, 6, 6, 4, 3],
      [2, 3, 4, 4, 4, 4, 3, 2]
    ];

    let allWay = [],
      current = {
        x: 0,
        y: 0
      },
      gridMoved = [];

    current.x = start.x;
    current.y = start.y;

    createGridMoved();

    gridMoved[start.x][start.y] = true;
    allWay.push({
      x: start.x,
      y: start.y
    });

    while (true) {
      let ways = canMove(current.x, current.y);
      if (!ways.length) break;
      nextCell(ways[0].x, ways[0].y);
      reduceDegree(ways);
    }
    return allWay;
  }

  function createFlag(posx, posy, time) {
    let flag = document.createElement("div");
    flag.classList.add("flag");
    flag.style.left = startPos.x + sizeCell * posx + "px";
    flag.style.top = startPos.y + sizeCell * posy + "px";
    setTimeout(function () {
      board.appendChild(flag);
    }, time);
  }

  function begin(x, y) {
    chess.style.transition = `0s`;
    chess.style.left = startPos.x + sizeCell * x + "px";
    chess.style.top = startPos.y + sizeCell * y + "px";
    setTimeout(function(){chess.style.transition = `left ${TRANSITION/1000}s linear, top ${TRANSITION/1000}s linear`;}, 4);
    createFlag(start.x, start.y, DELAY * 2 + TRANSITION);
  }

  function move(nx, ny, access) {
    chess.style.left = startPos.x + sizeCell * nx + "px";
    chess.style.top = startPos.y + sizeCell * ny + "px";
    if (access)
      createFlag(nx, ny, DELAY * 2 + TRANSITION);
  }
  const WAY = chessSolution(start);

  function initHorse() {
    begin(start.x, start.y);
    let i = 0;
    setInterval(function () {
      i++;
      if (i == WAY.length - 1)
        move(WAY[i].x, WAY[i].y, false);
      else
        move(WAY[i].x, WAY[i].y, true);
    }, DELAY * 2 + TRANSITION);
  }
  initHorse();
}

askChess();