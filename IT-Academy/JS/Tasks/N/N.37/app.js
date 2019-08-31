var clock = document.getElementById("clock");
const WIDTH = 400,
      HEIGHT = 400,
      RADIUS = WIDTH/2,
      specifiesSVG = 'http://www.w3.org/2000/svg';
var settings = {
    clock: {
        width: WIDTH,
        height: HEIGHT,
        radius: RADIUS,
        cx: RADIUS,
        cy: RADIUS,
        rx: RADIUS,
        ry: RADIUS,
        fill: "#f9f9f9",
        stroke: "#333"
    },
    numbers: {
        radius: 23,
        fill: "#333",
        count: 12,
        margin: 8,
        text: {
            fill: "#fff",
            fontSize: 20,
        }
    },
    arrows: {
        hour: {
            width: 90,
            stroke: "#f00",
            strokeWidth: 3,
            rotate: 0,
            strokeLinecap: "round"
        },
        minute: {
            width: 130,
            stroke: "#0f0",
            strokeWidth: 2,
            rotate: 0,
            strokeLinecap: "round"
        },
        second: {
            width: 160,
            stroke: "#00f",
            strokeWidth: 1,
            rotate: 0,
            strokeLinecap: "round"
        }
    },
    time: {
        fill: "#000",
        fontSize: 29,
    }
};
clock.setAttribute("width", settings.clock.width);
clock.setAttribute("height", settings.clock.height);
(function() {
    function Render(settings, parent) {
        var self = this;
        self.settings = settings;
        self.parent   = parent;
        self.numbers = function() {
            let radius = self.settings.clock.radius - self.settings.numbers.margin - self.settings.numbers.radius;
            let angle = 2 * Math.PI / self.settings.numbers.count;
            for (let i = 0; i < self.settings.numbers.count; i++) {
                let circle = document.createElementNS(specifiesSVG, "ellipse");
                let text   = document.createElementNS(specifiesSVG, "text"); 
                circle.setAttribute("rx", self.settings.numbers.radius || 0);
                circle.setAttribute("ry", self.settings.numbers.radius || 0);
                circle.setAttribute("fill", self.settings.numbers.fill || "red");
                cCX = self.settings.clock.radius + radius * Math.sin(angle * (i + 1));
                cCY = self.settings.clock.radius - radius * Math.cos(angle * (i + 1));
                circle.setAttribute("cx", cCX);
                circle.setAttribute("cy", cCY);
                text.setAttribute("fill", self.settings.numbers.text.fill);
                text.setAttribute("font-size", self.settings.numbers.text.fontSize); 
                text.setAttribute("x", cCX);
                text.setAttribute("y", cCY+2);
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("alignment-baseline", "middle");
                text.innerHTML = i + 1;
                self.parent.appendChild(circle);
                self.parent.appendChild(text);
            }
        }
        self.clock = function() {
            let clock = document.createElementNS(specifiesSVG, "ellipse");
            clock.setAttribute("cx", self.settings.clock.cx);
            clock.setAttribute("cy", self.settings.clock.cy);
            clock.setAttribute("rx", self.settings.clock.rx);
            clock.setAttribute("ry", self.settings.clock.ry);
            clock.setAttribute("fill", self.settings.clock.fill);
            clock.setAttribute("stroke", self.settings.clock.stroke);
            self.parent.appendChild(clock);
            self.clock = clock;
        }
        self.arrows = function() {
            let hour = document.createElementNS(specifiesSVG, "line");
            let minute = document.createElementNS(specifiesSVG, "line");
            let second = document.createElementNS(specifiesSVG, "line");
            hour.setAttribute("x1", self.settings.clock.radius);
            hour.setAttribute("y1", self.settings.clock.radius);
            hour.setAttribute("x2", self.settings.clock.radius);
            hour.setAttribute("y2", self.settings.clock.radius - self.settings.arrows.hour.width);
            hour.setAttribute("stroke", self.settings.arrows.hour.stroke);
            hour.setAttribute("stroke-width", self.settings.arrows.hour.strokeWidth);
            hour.setAttribute("stroke-linecap", self.settings.arrows.hour.strokeLinecap);
            minute.setAttribute("x1", self.settings.clock.radius);
            minute.setAttribute("y1", self.settings.clock.radius);
            minute.setAttribute("x2", self.settings.clock.radius);
            minute.setAttribute("y2", self.settings.clock.radius - self.settings.arrows.minute.width);
            minute.setAttribute("stroke", self.settings.arrows.minute.stroke);
            minute.setAttribute("stroke-width", self.settings.arrows.minute.strokeWidth);
            minute.setAttribute("stroke-linecap", self.settings.arrows.minute.strokeLinecap);
            second.setAttribute("x1", self.settings.clock.radius);
            second.setAttribute("y1", self.settings.clock.radius);
            second.setAttribute("x2", self.settings.clock.radius);
            second.setAttribute("y2", self.settings.clock.radius - self.settings.arrows.second.width);
            second.setAttribute("stroke", self.settings.arrows.second.stroke);
            second.setAttribute("stroke-wdith", self.settings.arrows.second.strokeWidth);
            second.setAttribute("stroke-linecap", self.settings.arrows.second.strokeLinecap);
            self.parent.appendChild(hour);
            self.parent.appendChild(minute);
            self.parent.appendChild(second);
            self.hour = hour;
            self.minute = minute;
            self.second = second;
        }
        self.timer = function() {
            let time = document.createElementNS(specifiesSVG, "text");
            time.setAttribute("fill", self.settings.time.fill);
            time.setAttribute("font-size", self.settings.time.fontSize); 
            time.setAttribute("x", self.settings.clock.radius);
            time.setAttribute("y", self.settings.clock.radius + 50);
            time.setAttribute("text-anchor", "middle");
            time.setAttribute("alignment-baseline", "middle");
            self.time = time;
            self.parent.appendChild(time);
        }
        self.tick = function() {
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
            function rotate() {
                self.hour.setAttribute("transform", `rotate(${self.settings.arrows.hour.rotate}, ${self.settings.clock.radius}, ${self.settings.clock.radius})`);
                self.minute.setAttribute("transform", `rotate(${self.settings.arrows.minute.rotate}, ${self.settings.clock.radius}, ${self.settings.clock.radius})`);
                self.second.setAttribute("transform", `rotate(${self.settings.arrows.second.rotate}, ${self.settings.clock.radius}, ${self.settings.clock.radius})`);
            }
            let date = new Date();
            let milisec = date.getMilliseconds();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            let hour = date.getHours();
            self.settings.arrows.hour.rotate = (hour + minute/60) / 12  * 360;
            self.settings.arrows.minute.rotate = (minute + (second + milisec / 1000) / 60) / 60 * 360;
            self.settings.arrows.second.rotate = (second + milisec / 1000) / 60 * 360;
            self.time.innerHTML = timeTransp(second, minute, hour);
            rotate();
            during = 1000 - milisec;
            setTimeout(self.tick, during); 
        }
    }
    let render = new Render(settings, clock);
    render.clock();
    render.numbers();
    render.arrows();
    render.timer();
    render.tick();
})();