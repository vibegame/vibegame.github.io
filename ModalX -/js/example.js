let option = document.querySelector(".main .option");
let optionItem = option.querySelector(".option-item");
let optionMenu = option.querySelector(".option-menu");
optionItem.setAttribute("data-name", "alert");
optionItem.setAttribute("data-func", "success");
option.addEventListener("click", function(elem) {
    let target = elem.target;
    if(target.classList.contains("option-item") || target.parentNode.classList.contains("option-item")) {
        toggleItem(optionMenu);
    }
    if(target.classList.contains("option-menu-item")) {
        optionItem.setAttribute("data-name", target.getAttribute("data-name"));
        optionItem.setAttribute("data-func", target.getAttribute("data-func"));
        optionItem.innerHTML = target.getAttribute("data-func") + "<i class='fas fa-sort-down'></i>";
        toggleItem(optionMenu);       
    }
});

function toggleItem(elem) {
    elem.classList.toggle("hidden");
}

var modal = new ModalX();

document.getElementById("modal-show-it").onclick = function() {
    let currentChoose = document.getElementById("main-option-item");
    let name = currentChoose.getAttribute("data-name");
    let style = currentChoose.getAttribute("data-func");
    var obj = {
        titleText: "Подтвердите действия!",
        text: "Добро пожаловать!",
        className: "center-x-top",
        duration: 400,
        durationOut: 3000,
        type: style,
        button: false,
        buttonText: "OK",
        inputText: "Type your text",
        buttonTextFalse: "Нет",
        buttonTextTrue: "Да"
    }
    switch(name) {
        case "alert": obj.button = false;modal.alert(obj);break;
        case "alert-btn": obj.button = true;modal.alert(obj);break;
        case "confirm": modal.confirm(obj);break;
        case "prompt": modal.prompt(obj);break;
    }
}
