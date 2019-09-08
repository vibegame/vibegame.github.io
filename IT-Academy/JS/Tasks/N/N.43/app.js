const Board = document.getElementById("Board");
const Score = document.getElementsByClassName("score")[0];
const btn = document.getElementById("btn-start");
let id = true;

function preLoaderLoading(time) {
    let preLoader = document.querySelector(".pre-loader");
    let text = preLoader.querySelector(".text");
    let loader = preLoader.querySelector(".loader");
    let line = loader.querySelector(".line");
    let percents = 0;
    let timer = setInterval(function () {
        percents++;
        line.style.width = `${percents}%`;
        text.innerHTML = `${percents}%`;
    }, time / 100);
    let timeEnd = setTimeout(function () {
        clearInterval(timer);
        clearTimeout(timeEnd);
        preLoader.style.display = "none";

    }, time);
}
let checkWin = (a, b) => {
    if (a > b) 
        return "First player wins!";
    else if (b > a) 
        return "Second player wins!";
    else 
        return "Draw!";
}
window.onload = function () {
    preLoaderLoading(2500);
    btn.onclick = function () {
        if (btn.classList.contains("disable")) return;
        btn.classList.add("disable");
        btn.innerHTML = "Playing...";
        ROCKETS.first.score = 0;
        ROCKETS.second.score = 0;
        id = requestAnimationFrame(frame);
        BALL.speedX = Math.random() * 1 + 3 * Math.sign(0.5 - Math.random());
        BALL.speedY = Math.random() * 1 + 3 * Math.sign(0.5 - Math.random());
        BALL.speedup = Math.random() / 20 + 1.01;
        BALL.ellact = Math.random() * 0.01 + 0.97;
        BALL.position = {
            x: BOARD.width / 2,
            y: BOARD.height / 2
        };
        renderScore();
    }
}
/* BEGIN SETTINGS OF BOARD */
const BOARD = {
    width: 800,
    height: 800,
    element: Board
}
Board.style.width = `${BOARD.width}px`;
Board.style.height = `${BOARD.height}px`;
/* END SETTINGS OF BOARD */

/* BEGIN SETTINGS OF BALL */
const BALL = {
    width: 20,
    height: 20,
    element: Board.querySelector(".ball"),
}
BALL.radius = BALL.width / 2;
BALL.element.style.height = `${BALL.height}px`;
BALL.element.style.width = `${BALL.width}px`;
/* END SETTINGS OF BALL */

/* BEGIN SETTINGS OF ROCKETS */
const ROCKETS = {
    width: 15,
    height: 0,
    maxSpeed: 8,
    first: {
        speed: 0,
        element: Board.querySelector(".racket.racket-1"),
        position: {},
        down: true,
        up: true,
        score: 0
    },
    second: {
        speed: 0,
        element: Board.querySelector(".racket.racket-2"),
        position: {},
        down: true,
        up: true,
        score: 0
    }
}
ROCKETS.height = BOARD.height * 0.3;

ROCKETS.first.element.style.width = `${ROCKETS.width}px`;
ROCKETS.second.element.style.width = `${ROCKETS.width}px`;

ROCKETS.first.element.style.height = `${ROCKETS.height}px`;
ROCKETS.second.element.style.height = `${ROCKETS.height}px`;

ROCKETS.first.position = {
    x: ROCKETS.first.element.offsetLeft,
    y: ROCKETS.first.element.offsetTop
}
ROCKETS.second.position = {
    x: ROCKETS.second.element.offsetLeft,
    y: ROCKETS.second.element.offsetTop
}
/* END SETTINGS OF ROCKETS */

renderBall = () => {
    BALL.element.style.left = `${BALL.position.x}px`;
    BALL.element.style.top = `${BALL.position.y}px`;
}
renderRockets = () => {
    ROCKETS.first.element.style.top = `${ROCKETS.first.position.y}px`;
    ROCKETS.second.element.style.top = `${ROCKETS.second.position.y}px`;
}
renderScore = () => {
    Score.innerHTML = `${ROCKETS.first.score} : ${ROCKETS.second.score}`;
}
let frame = () => {
    BALL.position.x += BALL.speedX;
    BALL.position.y += BALL.speedY;
    /* ROCKET BEGIN*/
    let RocketFirstY = ROCKETS.first.position.y;
    let RocketSecondY = ROCKETS.second.position.y;

    if ((RocketFirstY + ROCKETS.height / 2 >= BOARD.height && ROCKETS.first.speed > 0) ||
        (RocketFirstY - ROCKETS.height / 2 <= 0 && ROCKETS.first.speed < 0)
    ) {
        ROCKETS.first.speed = 0;
    }
    if ((RocketSecondY + ROCKETS.height / 2 >= BOARD.height && ROCKETS.second.speed > 0) ||
        (RocketSecondY - ROCKETS.height / 2 <= 0 && ROCKETS.second.speed < 0)
    ) {
        ROCKETS.second.speed = 0;
    }
    ROCKETS.first.position.y += ROCKETS.first.speed;
    ROCKETS.second.position.y += ROCKETS.second.speed;
    /* ROCKET END*/

    /* BALL BEGIN */
    let BallX = BALL.position.x;
    let BallY = BALL.position.y;
    if (
        BallX >= ROCKETS.second.position.x - BALL.radius &&
        BallY <= ROCKETS.second.position.y + ROCKETS.height / 2 &&
        BallY >= ROCKETS.second.position.y - ROCKETS.height / 2
    ) {
        BALL.speedX = BALL.speedX * -1 * BALL.speedup;
        BALL.speedY *= BALL.ellact;
        ROCKETS.second.score++;
        renderScore();
    } else if (
        BallX <= ROCKETS.first.position.x + BALL.radius + ROCKETS.width &&
        BallY <= ROCKETS.first.position.y + ROCKETS.height / 2 &&
        BallY >= ROCKETS.first.position.y - ROCKETS.height / 2
    ) {
        BALL.speedX = BALL.speedX * -1 * BALL.speedup;
        ROCKETS.first.score++;
        BALL.speedY *= BALL.ellact;
        renderScore();
    } else if (BallX >= BOARD.width - BALL.radius) {
        BALL.speedX = 0;
        BALL.speedY = 0;
        Score.innerHTML = checkWin(1, -1);
        stopAll();
    } 
    else if(BallX <= 0 + BALL.radius) {
        BALL.speedX = 0;
        BALL.speedY = 0;
        Score.innerHTML = checkWin(-1, 1);
        stopAll();
    }
    else if (BallY >= BOARD.height - BALL.radius || BallY <= 0 + BALL.radius) {
        BALL.speedY = BALL.speedY * -1 * BALL.speedup;
        BALL.speedX *= BALL.ellact;
    }
    /* BALL END */
    if (id) {
        renderBall();
        renderRockets();
        id = requestAnimationFrame(frame);
    }
}
let stopAll = () => {
    cancelAnimationFrame(id);
    id = false;
    btn.classList.remove("disable");
    btn.innerHTML = "Refresh";    
}
let keyuppedFirst = true,
    keyuppedSecond = true;
addEventListener("keydown", function (e) {
    keyupped = false;
    let key = e.keyCode;
    if (key == 38 && keyuppedFirst) {
        ROCKETS.second.speed = -ROCKETS.maxSpeed;
        keyuppedFirst = false;
    }
    if (key == 40 && keyuppedFirst) {
        ROCKETS.second.speed = ROCKETS.maxSpeed;
        keyuppedFirst = false;
    }
    if (key == 16 && keyuppedSecond) {
        ROCKETS.first.speed = -ROCKETS.maxSpeed;
        keyuppedSecond = false;
    }

    if (key == 17 && keyuppedSecond) {
        ROCKETS.first.speed = ROCKETS.maxSpeed;
        keyuppedSecond = false;
    }

});
addEventListener("keyup", function (e) {
    let key = e.keyCode;
    if (key == 38 || key == 40) {
        keyuppedFirst = true;
        ROCKETS.second.speed = 0;
    }
    if (key == 17 || key == 16) {
        keyuppedSecond = true;
        ROCKETS.first.speed = 0;
    }

});