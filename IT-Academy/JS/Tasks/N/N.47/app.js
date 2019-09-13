const BOARD = document.getElementById("board");
const BALL = BOARD.querySelector(".ball");
const ROCKET_FIRST = BOARD.querySelector(".racket.racket-first");
const ROCKET_SECOND = BOARD.querySelector(".racket.racket-second");

const SCORE = document.querySelector(".actions .score");
const BTN__REFRESHH = document.querySelector(".actions .btn.refresh");
const TEXT_WINNER = document.querySelector(".actions .text-winner");


let btn_refresh_disable = false;
let STOP_GAME = false;
function setDisable(dis) {
    if(dis) {
        BTN__REFRESHH.classList.add('disable');
        btn_refresh_disable = true;
    } else {
        BTN__REFRESHH.classList.remove('disable');
        btn_refresh_disable = false;
    }
}
BTN__REFRESHH.addEventListener("click", function () {
    if (btn_refresh_disable) return;
    btn_refresh_disable = true;
    setDisable(true);
    renderStart();
});



let settings = {
    board: {
        width: 800,
        height: 800,
        color: "#242687"
    },
    ball: {
        radius: 20,
        color: "#FFFFFF",
        x: 30,
        y: 30,
        speedX: 1,
        speedY: 0.5,
        accelerationX: 1.03,
        accelerationY: 1.03
    },
    rockets: {
        first: {
            width: 15,
            height: 180,
            color: "#E8D74D",
            x: 0,
            y: 0,
            rx: 5,
            ry: 5,
            speed: 0,
            maxSpeed: 2
        },
        second: {
            width: 15,
            height: 180,
            color: "#FF9661",
            x: 0,
            y: 0,
            rx: 5,
            ry: 5,
            speed: 0,
            maxSpeed: 2
        }
    },
    score: {
        first: 0,
        second: 0
    },
    textWinner: {
        text: ''
    }
};

function renderStart() {
    settings.rockets.first.x = 0;
    settings.rockets.second.x = settings.board.width - settings.rockets.second.width;
    settings.rockets.first.y = settings.board.height / 2 - settings.rockets.first.height / 2;
    settings.rockets.second.y = settings.board.height / 2 - settings.rockets.second.height / 2;
    settings.ball.x = settings.board.width / 2;
    settings.ball.y = settings.board.height / 2;
    render.update();
    render.board();
    render.ball();
    render.rocket(1);
    render.rocket(2);
    render.score();

    setDisable(true);
    STOP_GAME = false;
    settings.textWinner.text = '';
    render.textWinner();
    animation = requestAnimationFrame(frame);
}

function Render() {

    this.BALL = BALL;
    this.BOARD = BOARD;
    this.ROCKET_FIRST = ROCKET_FIRST;
    this.ROCKET_SECOND = ROCKET_SECOND;
    this.SCORE = SCORE;
    this.TEXT_WINNER = TEXT_WINNER;
    this.settings = settings;

    this.update = function () {
        this.settings = settings;
    }

    this.board = function () {
        let board = this.BOARD;
        let settings = this.settings.board;
        board.style.width = settings.width;
        board.style.height = settings.height;
        board.style.background = settings.color;
    }


    this.ball = function () {
        let ball = this.BALL;
        let settings = this.settings.ball;
        ball.setAttribute("cx", settings.x);
        ball.setAttribute("cy", settings.y);
        ball.setAttribute("r", settings.radius);
        ball.setAttribute("fill", settings.color);
    };

    this.rocket = function (n) {
        let rocket = (n == 1 ? this.ROCKET_FIRST : this.ROCKET_SECOND);
        let settings = (n == 1 ? this.settings.rockets.first : this.settings.rockets.second);
        rocket.setAttribute("x", settings.x);
        rocket.setAttribute("y", settings.y);
        rocket.setAttribute("width", settings.width);
        rocket.setAttribute("height", settings.height);
        rocket.setAttribute("fill", settings.color);
        rocket.setAttribute("rx", settings.rx);
        rocket.setAttribute("ry", settings.ry);
    };

    this.score = function () {
        let score = this.SCORE;
        let settings = this.settings.score;
        score.innerHTML = `${settings.first} : ${settings.second}`;
    }

    this.textWinner = function () {
        let textWinner = this.TEXT_WINNER;
        let settings = this.settings.textWinner;
        textWinner.innerHTML = settings.text;
    }
}

function stopGame(winner) {
    let textWinner = winner == 1 ? `First person win!` : `Second person win!`;
    setDisable(false);
    STOP_GAME = true;
    settings.textWinner.text = textWinner;
    render.textWinner();
    cancelAnimationFrame(animation);
}

let frame = function () {

    settings.ball.x += settings.ball.speedX;
    settings.ball.y += settings.ball.speedY;
    if(settings.rockets.first.y + settings.rockets.first.height >= settings.board.width && settings.rockets.first.speed > 0 ||
       settings.rockets.first.y <= 0 && settings.rockets.first.speed < 0) 
    {
        settings.rockets.first.speed = 0;
    }
    if(settings.rockets.second.y + settings.rockets.second.height >= settings.board.width && settings.rockets.second.speed > 0 ||
       settings.rockets.second.y <= 0 && settings.rockets.second.speed < 0) 
    {
        settings.rockets.second.speed = 0;
    }

    settings.rockets.first.y += settings.rockets.first.speed;
    settings.rockets.second.y += settings.rockets.second.speed;

    if (settings.ball.y + settings.ball.radius >= settings.board.height ||
        settings.ball.y - settings.ball.radius <= 0
    ) {
        settings.ball.speedY *= -1;
        settings.ball.speedY *= settings.ball.accelerationY;
    }

    if (settings.ball.x - settings.ball.radius <= settings.rockets.first.width && 
        settings.ball.y <= settings.rockets.first.y + settings.rockets.first.height + settings.ball.radius &&
        settings.ball.y >= settings.rockets.first.y - settings.ball.radius
       ) 
    {
       settings.ball.speedX *= -1;
       settings.ball.speedX *= settings.ball.accelerationX;
       settings.score.first++;   
       render.score();
    }

    if (settings.ball.x + settings.ball.radius >= settings.board.width - settings.rockets.second.width &&
        settings.ball.y <= settings.rockets.second.y + settings.rockets.second.height + settings.ball.radius &&
        settings.ball.y >= settings.rockets.second.y - settings.ball.radius
        ) 
    {
        settings.ball.speedX *= -1;
        settings.ball.speedX *= settings.ball.accelerationX;
        settings.score.second++;
        render.score();
    }


    if (settings.ball.x + settings.ball.radius >= settings.board.width) {
        stopGame(1);
    }
    if (settings.ball.x - settings.ball.radius <= 0) {
        stopGame(2);
    }

    render.ball();
    render.rocket(1);
    render.rocket(2);

    if (STOP_GAME)
        cancelAnimationFrame(animation);
    else
        animation = requestAnimationFrame(frame);
}
let animation = requestAnimationFrame(frame);


let keyuppedFirst = true,
    keyuppedSecond = true;
addEventListener("keydown", function (e) {
    keyupped = false;
    let key = e.keyCode;
    if (key == 38 && keyuppedFirst) {
        settings.rockets.second.speed = -settings.rockets.second.maxSpeed;
        keyuppedFirst = false;
    }
    if (key == 40 && keyuppedFirst) {
        settings.rockets.second.speed = settings.rockets.second.maxSpeed;
        keyuppedFirst = false;
    }
    if (key == 16 && keyuppedSecond) {
        settings.rockets.first.speed = -settings.rockets.first.maxSpeed;
        keyuppedSecond = false;
    }

    if (key == 17 && keyuppedSecond) {
        settings.rockets.first.speed = settings.rockets.first.maxSpeed;
        keyuppedSecond = false;
    }

});
addEventListener("keyup", function (e) {
    let key = e.keyCode;
    if (key == 38 || key == 40) {
        keyuppedFirst = true;
        settings.rockets.second.speed = 0;
    }
    if (key == 17 || key == 16) {
        keyuppedSecond = true;
        settings.rockets.first.speed = 0;
    }

});
let render = new Render();

renderStart();