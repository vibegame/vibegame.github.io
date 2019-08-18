const clock = document.getElementById("clock");
const clocksMini = {
    second: {element: clock.querySelector(".clock-mini.clock-second"), n: 12, radius: 63},
    minute: {element: clock.querySelector(".clock-mini.clock-minute"), n: 12, radius: 63},
    hour: {element: clock.querySelector(".clock-mini.clock-hour"), n: 12, radius: 63},
}
const clockNumber = clock.querySelector(".clock-number");
const time = clock.querySelector(".time");
const defaultRotate = 270;
const arrows = {
    second: {
        element: clocksMini.second.element.querySelector(".arrow.arrow-second"),
        rotate: defaultRotate
    },
    minute: {
        element: clocksMini.minute.element.querySelector(".arrow.arrow-minute"),
        rotate: defaultRotate
    },
    hour: {
        element: clocksMini.hour.element.querySelector(".arrow.arrow-hour"),
        rotate: defaultRotate
    }
}

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
    arrows.second.element.style.transform = `rotate(${(arrows.second.rotate + defaultRotate)%360}deg)`;
    arrows.minute.element.style.transform = `rotate(${(arrows.minute.rotate + defaultRotate)%360}deg)`;
    arrows.hour.element.style.transform = `rotate(${(arrows.hour.rotate + defaultRotate)%360}deg)`;
}
renderClock(clocksMini.hour.element, clocksMini.hour.radius, clocksMini.hour.n, "number");
renderClock(clocksMini.minute.element, clocksMini.minute.radius, clocksMini.minute.n, "number");
renderClock(clocksMini.second.element, clocksMini.second.radius, clocksMini.second.n, "number");
rotate();
tick();

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
    arrows.second.rotate = (second + milisec / 1000) / 60 * 360;
    arrows.minute.rotate = (minute + (second + milisec / 1000) / 60) / 60 * 360;
    arrows.hour.rotate = (hour + minute/60) / 12  * 360;
    time.innerHTML = timeTransp(second, minute, hour);
    rotate();
}
setInterval(tick, 100);