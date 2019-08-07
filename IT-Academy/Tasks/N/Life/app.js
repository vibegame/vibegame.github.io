var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  field = document.querySelector(".field"),
  size = 6,
  canvas_up = 60,
  speedScroll = {
    up: 10,
    down: 10,
    left: 10,
    right: 10
  },
  blocks = {},
  animation = false,
  fps = 60;
canvas.width = Math.round(field.offsetWidth / size) * size;
canvas.height = Math.round(field.offsetHeight / size) * size;
count = {
  width: canvas.width / size,
  height: canvas.height / size,
  update: function () {
    this.width = canvas.width / size
    this.height = canvas.height / size;
  }
}
class Block {
  constructor(x, y) {
    this.x = x * this.size;
    this.y = y * this.size;
    this.fillStyle = "white";
    this.alive = true;
  }
  color(color) {
    this.fillStyle = color;
  }
  draw() {
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  position(x, y) {
    this.x = x * this.size;
    this.y = y * this.size;
  }
}
window.onkeydown = function (e) {
  if (e.key == "ArrowUp") {
    canvas.style.top = canvas.offsetTop + speedScroll.up + "px";
  }
  if (e.key == "ArrowDown") {
    canvas.style.top = canvas.offsetTop - speedScroll.down + "px";
  }
  if (e.key == "ArrowLeft") {
    canvas.style.left = canvas.offsetLeft + speedScroll.left + "px";
  }
  if (e.key == "ArrowRight") {
    canvas.style.left = canvas.offsetLeft - speedScroll.right + "px";
  }
}

function createWorld(n) {
  let strXY;
  blocks = {};
  resize(size);
  let k = 0;
  do {
    let x = Math.floor(Math.random() * (canvas.width / size));
    let y = Math.floor(Math.random() * (canvas.height / size));
    let strXY = `${x}-${y}`;
    if (strXY in blocks)
      continue;
    let block = new Block(x, y);
    blocks[strXY] = block;
  } while (Object.keys(blocks).length < n)
}

function countNeighbors(x, y) {
  let n = 0;
  if (`${x}-${y-1}` in blocks) n++;
  if (`${x+1}-${y-1}` in blocks) n++;
  if (`${x+1}-${y}` in blocks) n++;
  if (`${x+1}-${y+1}` in blocks) n++;
  if (`${x}-${y+1}` in blocks) n++;
  if (`${x-1}-${y+1}` in blocks) n++;
  if (`${x-1}-${y}` in blocks) n++;
  if (`${x-1}-${y-1}` in blocks) n++;
  return n;
}

function removeLife() {
  let lifes = [];
  for (let key in blocks) {
    let coord = key.split("-");
    let neighbors = countNeighbors(+coord[0], +coord[1]);
    if (neighbors < 2 || neighbors > 3) {
      lifes.push(key);
    }
  }
  return lifes;
}

function findLife() {
  let lifes = [];
  for (let i = 0; i < count.width; i++) {
    for (let j = 0; j < count.height; j++) {
      let neighbors = countNeighbors(i, j);
      if (neighbors == 3) {
        if ((i < 5 || j < 5 || i > count.width - 5 || j > count.height - 5) && canvas.width < 900) {
          canvas.width = canvas.width + canvas_up;
          canvas.height = canvas.height + canvas_up;
          canvas.style.top = canvas.offsetTop - canvas_up / 2 + "px";
          canvas.style.left = canvas.offsetLeft - canvas_up / 2 + "px";
          setTimeout(() => {
            animation = true
          }, 1000);
          updatePositions(canvas_up);
          count.update();
        }
        lifes.push({
          x: i,
          y: j
        });
      }
    }
  }
  return lifes;
}

function update(add, remove) {
  if (add) {
    add.forEach(pos => {
      let block = new Block(pos.x, pos.y);
      blocks[`${pos.x}-${pos.y}`] = block;
    });
  }
  if (remove) {
    remove.forEach(key => {
      delete blocks[key];
    });
  }
}

function drawAll() {
  for (let key in blocks) {
    blocks[key].draw();
  }
}

function updatePositions(newSize) {
  for (let key in blocks) {
    let coord = key.split("-");
    let value = blocks[key];
    value.position(blocks[key].x + newSize / 2, blocks[key].y + newSize / 2);
    let newX = +coord[0] + newSize / (2 * size);
    let newY = +coord[1] + newSize / (2 * size);
    delete blocks[key];
    blocks[`${newX}-${newY}`] = value;
  }
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resize(size) {
  Block.prototype.size = size;
}

function updateFrame() {
  clear();
  ctx.beginPath();
  drawAll();
  update(findLife(), removeLife());
}

document.getElementById("create-lifes").onclick = function() {
  animation = false;
  let n = +prompt("Сколько жизней создадим?");
  fps = +prompt("Сколько FPS?(30-144)");
  createWorld(n);
  clear();
  ctx.beginPath();
  drawAll();
}
document.getElementById("begin").onclick = function() {
  animation = true;
}
setInterval(function () {
  if(animation)
    updateFrame();
}, 1000 / fps);