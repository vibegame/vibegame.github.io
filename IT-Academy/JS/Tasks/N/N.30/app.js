"use strict";
let imagesArr = document.querySelectorAll("body img"); // массив изображений
let images = new MovingImage(imagesArr); // первый параметр - массив изображений
function MovingImage(elems) { 
  var self = this;
  self.clickedDown = false; // элемент нажат
  self.lastClickedElement = null; // последний нажатый элемент
  self.clickedElement = null; // нажатый элемент
  self.down = function (event) { // нажатие на кнопку мыши
    let standIndex = 100000;
    event.preventDefault();
    self.clickedDown = true;
    self.clickedElement = event.target;
    self.offsetX = event.offsetX;
    self.offsetY = event.offsetY;
    self.clickedElement.style.zIndex = standIndex + 1;
    self.clickedElement.style.cursor = "grabbing";
    if (self.lastClickedElement) self.lastClickedElement.style.zIndex = standIndex;
  }
  self.up = function (event) { //отжатие кнопки мыши
    event.preventDefault();
    if (!self.clickedDown) return false;
    self.clickedDown = false;
    self.lastClickedElement = self.clickedElement;
    self.clickedElement.style.cursor = "grab";
    self.clickedElement = null;
  }
  self.move = function (event) { //перетаскивание
    if (!self.clickedDown) return false;
    self.clickedElement.style.left = event.pageX - images.offsetX + "px";
    self.clickedElement.style.top = event.pageY - images.offsetY + "px";
  }
  self.out = function (event) {
    event.preventDefault();
    if (!self.clickedDown) return false;
    self.clickedDown = false;
    self.lastClickedElement = self.clickedElement;
    self.clickedElement.style.cursor = "grab";
    self.clickedElement = null;
  }
  elems.forEach(element => { // стандрантные настройки для элементов
    element.style.position = "absolute";
    element.addEventListener("mousedown", self.down);
    element.addEventListener("mouseup", self.up);
    element.addEventListener("mouseout", self.out);
  });

  document.body.addEventListener("mousemove", function (event) {
    event.preventDefault();
    self.move(event);
  });
}