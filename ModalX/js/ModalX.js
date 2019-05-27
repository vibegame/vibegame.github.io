'use strict'
let body = document.body;
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
var ModalXAnimations = {

    fadeIn: function(element, duration = 500) {
        element.style.removeProperty('display');
        let display = window.getComputedStyle(element).display;

        if (display === 'none') 
            display = 'block';

        let opacity = getComputedStyle(element).opacity;
        element.style.display = display;
        element.style.transitionDuration = 0 + 'ms';
        element.style.opacity = 0;
        getComputedStyle(element).opacity;
        element.style.transitionDuration = duration + 'ms';
        element.style.transitionProperty = `opacity`;     
        element.style.opacity = opacity;
        setTimeout(function () {
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
        } , duration)
    },
    fadeOut: function(element, duration = 500) {
        element.style.transitionProperty = `opacity`;
        element.style.transitionDuration = duration + 'ms';
        element.style.opacity = 0;
        window.setTimeout(function () {
            element.style.display = 'none';
            element.style.removeProperty('opacity');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
        }, duration)
    },
    fadeToggle: function (element, duration = 500) {

        if (window.getComputedStyle(element).display === 'none') {

            return this.slideDown(element, duration);

        } else {

            return this.slideUp(element, duration);
        }
    }
}
function elementOut(element, duration) {
    ModalXAnimations.fadeOut(element, duration);
    removeCurrentTime(element, duration);                
}
function remove(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
}
function removeCurrentTime(element, time) {
    return setTimeout(function() {
        remove(element);
    }, time);
}
function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}
function enableScrolling(){
    window.onscroll=function(){};
}
function createElement(tag, className, text, id) {
    if(!tag)
        return false;
    if(!className)
        className = "";
    if(!text)
        text = "";
    if(!id)
        id = "";
    var element = document.createElement(tag);
    element.className = className;
    element.innerHTML = text;
    element.id = id;
    return element;
}
class ModalX {
    constructor() {
        this.titleText = "";
        this.duration = 600;
        this.durationOut = 3000;  
        this.text = "";
        this.className = "";
        this.type = "primary";
        this.button = false;
        this.buttonText = "OK";
        this.inputText = "Type your text";
        this.result = undefined;
        this.buttonTextFalse = "No";
        this.buttonTextTrue = "YES";
    }
    alert(prop) {
        var text, duration, durationOut, className, type, button, buttonText, titleText;
        var fullClass;
        if(!prop) {
            titleText = this.titleText;
            text = this.text;
            duration = this.duration;
            className = this.className;
            duration = this.durationOut;
            type = this.type;
            button = this.button;
            buttonText = this.buttonText;
        } else {
            titleText = prop.titleText || this.titleText;
            text = prop.text || this.text;
            duration = prop.duration || this.duration;
            className = prop.className || this.className;
            durationOut = prop.durationOut || this.durationOut;
            type = prop.type || this.type;
            button = prop.button || this.button;
            buttonText = prop.buttonText || this.buttonText;
        }
        
        if(button) {
            var modalButton = createElement("a", "modalx-btn", buttonText);
            fullClass = `ModalX modalx-alert-btn modalx-alert-btn-${type}`;
        } else 
            fullClass = `ModalX modalx-alert modalx-alert-${type}`;
        var modalFrame = createElement('div', `${fullClass} ${className}`);
        if(titleText != "")
            var modalTitle = createElement('h6', "modalx-title", titleText);
        var modalText = createElement(`span`, "modalx-text", text);
        if(modalTitle)
            modalFrame.appendChild(modalTitle);
        modalFrame.appendChild(modalText);

        if(modalButton) {
            modalButton.onclick = function() {
                elementOut(modalFrame, duration);
                clearTimeout(timerFade);
                enableScrolling();
            };
            modalFrame.appendChild(modalButton);   
        } else {
            modalFrame.onclick = function() {
                elementOut(modalFrame, duration);
                clearTimeout(timerFade);
                enableScrolling();
            };
            var timerFade = setTimeout(function() {
                ModalXAnimations.fadeOut(modalFrame, duration);
                removeCurrentTime(modalFrame, duration);   
            } , durationOut);
        }        
        body.appendChild(modalFrame);
        ModalXAnimations.fadeIn(modalFrame, duration);
        disableScrolling();  
    }
    confirm(prop, func) {
        var duration, durationOut, className, type, text, buttonTextTrue, buttonTextFalse, titleText;
        var fullClass;
        if(!prop) {
            titleText = this.titleText;
            text = this.text;
            duration = this.duration;
            className = this.className;
            duration = this.durationOut;
            type = this.type;
            buttonTextFalse = this.buttonTextFalse;
            buttonTextTrue = this.buttonTextTrue;
        } else {
            titleText = prop.titleText || this.titleText;
            text = prop.text || this.text;
            duration = prop.duration || this.duration;
            className = prop.className || this.className;
            durationOut = prop.durationOut || this.durationOut;
            type = prop.type || this.type;
            buttonTextFalse = prop.buttonTextFalse || this.buttonTextFalse;
            buttonTextTrue = prop.buttonTextTrue || this.buttonTextTrue;
        }
        
        fullClass = `ModalX modalx-confirm modalx-confirm-${type}`;
        var modalFrame = createElement('div', `${fullClass} ${className}`);
        if(titleText != "" && titleText)
            var modalTitle = createElement('h6', "modalx-title", titleText);
        var modalText = createElement(`span`, "modalx-text", text);
        var modalButtonTrue = createElement("a", "modalx-btn modalx-btn-true", buttonTextTrue);
        var modalButtonFalse = createElement("a", "modalx-btn modalx-btn-false", buttonTextFalse);
        if(modalTitle)
            modalFrame.appendChild(modalTitle);
        modalFrame.appendChild(modalText);
        modalButtonTrue.onclick = function() {
            elementOut(modalFrame, duration);
            enableScrolling();
            if(isFunction(func))
                func(true);
        };
        modalButtonFalse.onclick = function() {
            elementOut(modalFrame, duration);
            enableScrolling();
            if(isFunction(func))
                func(false);
        };
        modalFrame.appendChild(modalButtonTrue);
        modalFrame.appendChild(modalButtonFalse);       
        body.appendChild(modalFrame);
        ModalXAnimations.fadeIn(modalFrame, duration);
        disableScrolling();        
    }
    prompt(prop, func) {
        var duration, durationOut, className, type, text, buttonText, titleText, inputText;
        var fullClass;
        if(!prop) {
            titleText = this.titleText;
            text = this.text;
            duration = this.duration;
            className = this.className;
            duration = this.durationOut;
            type = this.type;
            buttonText = this.buttonText;
            inputText = this.inputText;
        } else {
            titleText = prop.titleText || this.titleText;
            text = prop.text || this.text;
            duration = prop.duration || this.duration;
            className = prop.className || this.className;
            durationOut = prop.durationOut || this.durationOut;
            type = prop.type || this.type;
            buttonText = prop.buttonText || this.buttonText;
            inputText = prop.inputText || this.inputText;
        }
        
        fullClass = `ModalX modalx-prompt modalx-prompt-${type}`;
        var modalFrame = createElement('div', `${fullClass} ${className}`);
        if(titleText != "" && titleText)
            var modalTitle = createElement('h6', "modalx-title", titleText);
        var modalText = createElement(`span`, "modalx-text", text);
        var modalInput = createElement(`input`, "modalx-input");
        modalInput.type = "text";
        modalInput.placeholder = inputText;
        var modalButton = createElement("a", "modalx-btn", buttonText);
        if(modalTitle)
            modalFrame.appendChild(modalTitle);
        modalFrame.appendChild(modalText);
        modalFrame.appendChild(modalInput);
        modalButton.onclick = function() {
            elementOut(modalFrame, duration);
            enableScrolling();
            if(isFunction(func))
                func(modalInput.value);
        };
        modalFrame.appendChild(modalButton);       
        body.appendChild(modalFrame);
        ModalXAnimations.fadeIn(modalFrame, duration);
        disableScrolling();
    }
}


       

