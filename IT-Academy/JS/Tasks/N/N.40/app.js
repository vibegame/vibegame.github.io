let cvs = document.getElementById("cvs");
cvs.width = 600;
cvs.height = 600;
let ctx = cvs.getContext("2d");
const SETTINGS = {
    clock: {
        width: cvs.width,
        height: cvs.height,
        radius: 250,
        fillStyle: "#1C1347",
        numbers: {
            radius: 25,
            fillStyle: "#ffffff",
            margin: 8,
            font: {
                size: "32px",
                family: "sans-serif",
                color: "#0D2345"
            }
        },
        arrows: {
            second: {rotate: 0, width: 2, height: 180, color: "#FACB01"},
            minute: {rotate: 0, width: 3, height: 130, color: "#0CE815"},
            hour: {rotate: 0, width: 6, height: 90, color: "#009DFF"}
        },
        miniClock: {
            size: "32px",
            family: "sans-serif",
            color: "#E4FAEA",
            marginTop: 50,
            marginLeft: 0
        }
    }
};
function drawClock() {
    ctx.fillStyle = SETTINGS.clock.fillStyle;
    ctx.beginPath();
    ctx.arc(SETTINGS.clock.width / 2, SETTINGS.clock.height / 2, SETTINGS.clock.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}
function renderNumbers(n) {
    let angle = 2 * Math.PI / n;
    let numbers = [];
    let distance = SETTINGS.clock.radius - SETTINGS.clock.numbers.radius - SETTINGS.clock.numbers.margin;
    let radius = SETTINGS.clock.numbers.radius;
    for (let i = 0; i < n; i++) {

        elementCenterX = SETTINGS.clock.width / 2 + distance * Math.sin(angle * (i + 1));
        elementCenterY = SETTINGS.clock.height / 2 - distance * Math.cos(angle * (i + 1));

        numbers.push({
            x: Math.round(elementCenterX),
            y: Math.round(elementCenterY)
        });

    }
    return function() {
        let arr = numbers;
        for(let i=0;i<arr.length;i++) {
            let element = arr[i];
            ctx.beginPath();
            ctx.arc(element.x, element.y, radius, 0, Math.PI * 2, true);
            ctx.fillStyle = SETTINGS.clock.numbers.fillStyle;
            ctx.fill();
            ctx.fillStyle = SETTINGS.clock.numbers.font.color;
            ctx.font = `${SETTINGS.clock.numbers.font.size} ${SETTINGS.clock.numbers.font.family}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(i+1, element.x, element.y+2); // +2 is margin
            ctx.closePath();
        }
    }
}
function renderArrows() {

    let centerX = SETTINGS.clock.width / 2;
    let centerY = SETTINGS.clock.height / 2;

    drawSecond = () => {
        secondEndX = centerX + SETTINGS.clock.arrows.second.height * Math.sin(SETTINGS.clock.arrows.second.rotate);
        secondEndY = centerY - SETTINGS.clock.arrows.second.height * Math.cos(SETTINGS.clock.arrows.second.rotate);
        ctx.beginPath();
        ctx.strokeStyle = SETTINGS.clock.arrows.second.color;
        ctx.lineWidth = SETTINGS.clock.arrows.second.width;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(Math.round(secondEndX), Math.round(secondEndY));
        ctx.stroke();
        ctx.closePath();
    }
    drawMinute = () => {
        minuteEndX = centerX + SETTINGS.clock.arrows.minute.height * Math.sin(SETTINGS.clock.arrows.minute.rotate);
        minuteEndY = centerY - SETTINGS.clock.arrows.minute.height * Math.cos(SETTINGS.clock.arrows.minute.rotate);
        ctx.beginPath();
        ctx.strokeStyle = SETTINGS.clock.arrows.minute.color;
        ctx.lineWidth = SETTINGS.clock.arrows.minute.width;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(Math.round(minuteEndX), Math.round(minuteEndY));
        ctx.stroke();
        ctx.closePath();
    }
    drawHour = () => {
        hourEndX = centerX + SETTINGS.clock.arrows.hour.height * Math.sin(SETTINGS.clock.arrows.hour.rotate);
        hourEndY = centerY - SETTINGS.clock.arrows.hour.height * Math.cos(SETTINGS.clock.arrows.hour.rotate);
        ctx.beginPath();
        ctx.strokeStyle = SETTINGS.clock.arrows.hour.color;
        ctx.lineWidth = SETTINGS.clock.arrows.hour.width;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(Math.round(hourEndX), Math.round(hourEndY));
        ctx.stroke();
        ctx.closePath();
    }
    return function() {
        drawSecond();
        drawMinute();
        drawHour();
    } 
}
function renderMiniClock() {

    let centerX = SETTINGS.clock.width / 2;
    let centerY = SETTINGS.clock.height / 2;



    timeTransp = (second, minute, hour) => {
        var strTime = "";
        if (hour < 10) strTime += `0${hour}:`;
        else strTime += `${hour}:`;
        if (minute < 10) strTime += `0${minute}:`;
        else strTime += `${minute}:`;
        if (second < 10) strTime += `0${second}`;
        else strTime += `${second}`;
        return strTime;
    }


    return function(second, minute, hour) {
        transpText = timeTransp(second, minute, hour);
        ctx.fillStyle = SETTINGS.clock.miniClock.color;
        ctx.beginPath();
            ctx.fillStyle = SETTINGS.clock.miniClock.color;
            ctx.font = `${SETTINGS.clock.miniClock.size} ${SETTINGS.clock.miniClock.family}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(transpText, centerX + SETTINGS.clock.miniClock.marginLeft, centerY + SETTINGS.clock.miniClock.marginTop); // +2 is margin
        ctx.closePath();
    }
}
let clearCVS = () => {
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}
function tick() {
    let date = new Date();
    let milisec = date.getMilliseconds();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let hour = date.getHours();
    SETTINGS.clock.arrows.second.rotate = (second + milisec / 1000) / 60 * 2 * Math.PI;
    SETTINGS.clock.arrows.minute.rotate = (minute + second / 60) / 60 * 2 * Math.PI;
    SETTINGS.clock.arrows.hour.rotate = (hour + minute/60) / 12 * 2 * Math.PI;
    clearCVS();
    drawClock();
    drawNumbers();
    drawArrows();
    drawMiniClock(second, minute, hour);
    during = 1000 - milisec;
    setTimeout(tick, during);
}
function start() {
    drawNumbers = renderNumbers(12);
    drawArrows = renderArrows();
    drawMiniClock = renderMiniClock();
    tick();
}
var drawNumbers, drawArrows, drawMiniClock;
start();