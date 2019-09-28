let loader = document.getElementById("loader-line");
let text = document.querySelector('.Loader .text');
function loading(time) {
    let percent = 0;
    let timer = setInterval(function() {
        percent++;
        loader.dataset.percent = percent;
        loader.style.width = `${percent}%`;
        text.innerHTML = `${percent}%`;
        if(timer && percent == 100)
            clearInterval(timer);
    }, time / 100);
}
loading(100000);