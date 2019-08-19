const clock = document.getElementById("clock");
const clockMini = {
    element: clock.querySelector(".clock-mini"), 
    n: 12, 
    radius: 85
}
let defaulTransformArrow = 'translate(-50%, -100%)';
const arrows = {
    hour: {element: clockMini.element.querySelector(".arrow.arrow-hour"), rotate: 90},
    minute: {element: clockMini.element.querySelector(".arrow.arrow-minute"), rotate: 0},
    second: {element: clockMini.element.querySelector(".arrow.arrow-second"), rotate: 0},
}

const clockNumber = clock.querySelector(".clock-number");
const time = clock.querySelector(".time");

function renderClock(parent, radius, n, name) {

    var angle = 2 * Math.PI / n;

    for (let i = 0; i < n; i++) {
        let element = document.createElement("span");
        element.innerHTML = i + 1;
        element.className = name;
        parent.appendChild(element);

        elementCenterX = element.offsetLeft + parent.offsetWidth / 2 + radius * Math.sin(angle * (i + 1));
        elementCenterY = element.offsetTop + parent.offsetHeight / 2 - radius * Math.cos(angle * (i + 1));

        element.style.left = Math.round(elementCenterX - element.offsetWidth / 2) + 'px';
        element.style.top = Math.round(elementCenterY - element.offsetHeight / 2) + 'px';
    }

}
function rotate() {
    arrows.second.element.style.transform = `${defaulTransformArrow} rotate(${(arrows.second.rotate)}deg)`;
    arrows.minute.element.style.transform = `${defaulTransformArrow} rotate(${(arrows.minute.rotate)}deg)`;
    arrows.hour.element.style.transform = `${defaulTransformArrow} rotate(${(arrows.hour.rotate)}deg)`;
}
function timeTransp(second, minute, hour) {
    var strTime = "";
    if (hour < 10) strTime += `0${hour}:`;
    else strTime += `${hour}:`;
    if (minute < 10) strTime += `0${minute}:`;
    else strTime += `${minute}:`;
    if (second < 10) strTime += `0${second}`;
    else strTime += `${second}`;
    return strTime;
}
function tick() {
    let date = new Date();
    let milisec = date.getMilliseconds();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let hour = date.getHours();
    during = 1000 - milisec;
    arrows.second.rotate = (second + milisec / 1000) / 60 * 360;
    arrows.minute.rotate = (minute + (second + milisec / 1000) / 60) / 60 * 360;
    arrows.hour.rotate = (hour + minute/60) / 12  * 360;
    time.innerHTML = timeTransp(second, minute, hour);
    rotate();
    if(during < 900) console.warn("WARNING during = " + during);
    setTimeout(tick, during);
}
function start() {
    renderClock(clockMini.element, clockMini.radius, clockMini.n, "number");
    let date = new Date();
    let milisec = date.getMilliseconds();
    during = 1000 - milisec;
    setTimeout(tick, during);
}
start();



