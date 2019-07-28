"use strict";

function createForm(formStruct) {
  function Create() {
    this.longText = function(label, name) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let inputDOM = document.createElement("input");
      inputDOM.type = "text";
      inputDOM.className = "input__longText";
      inputDOM.name = name;
      formDOM.appendChild(labelDOM);
      formDOM.appendChild(inputDOM);
    };
    this.shortText = function(label, name) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let inputDOM = document.createElement("input");
      inputDOM.type = "text";
      inputDOM.className = "input__shortText";
      inputDOM.name = name;
      formDOM.appendChild(labelDOM);
      formDOM.appendChild(inputDOM);
    };
    this.number = function(label, name) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let inputDOM = document.createElement("input");
      inputDOM.type = "text";
      inputDOM.className = "input__number";
      inputDOM.name = name;
      formDOM.appendChild(labelDOM);
      formDOM.appendChild(inputDOM);
    };
    this.combo = function(label, name, options) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let selectDOM = document.createElement("select");
      selectDOM.className = "input__select";
      selectDOM.name = name;
      options.forEach(element => {
        let optionDOM = document.createElement("option");
        optionDOM.value = element.value;
        optionDOM.innerHTML = element.text;
        optionDOM.className = "input__select__option";
        selectDOM.appendChild(optionDOM);
      });
      formDOM.appendChild(labelDOM);
      formDOM.appendChild(selectDOM);
    };
    this.radio = function(label, name, options) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let divDOM = document.createElement("div");
      divDOM.className = "block__radio";
      options.forEach(element => {
        let inputDOM = document.createElement("input");
        inputDOM.type = "radio";
        inputDOM.name = name;
        inputDOM.value = element.value;
        inputDOM.className = "input__radio";
        let spanDOM = document.createElement("span");
        spanDOM.innerHTML = element.text;
        divDOM.appendChild(inputDOM);
        divDOM.appendChild(spanDOM);
      });
      formDOM.appendChild(labelDOM);
      formDOM.appendChild(divDOM);
    };
    this.check = function(label, name) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let inputDOM = document.createElement("input");
      inputDOM.type = "checkbox";
      inputDOM.className = "input__checkbox";
      inputDOM.name = name;
    };
    this.memo = function(label, name) {
      let labelDOM = document.createElement("label");
      labelDOM.innerHTML = label;
      let textareaDOM = document.createElement("textarea");
      textareaDOM.name = name;
      textareaDOM.className = "input__textarea";
      formDOM.appendChild(labelDOM);
      formDOM.appendChild(textareaDOM);
    };
    this.submit = function(label) {
      let inputDOM = document.createElement("input");
      inputDOM.type = "submit";
      inputDOM.value = label;
      formDOM.appendChild(inputDOM);
    };
  }
  let formDOM = document.createElement("form");
  formDOM.action = "http://fe.it-academy.by/TestForm.php";
  let createDOM = new Create();

  formStruct.forEach(element => {
    // switch (element.kind) {
    //   case "longtext":
    //     createDOM.longText(element.label, element.name);
    //     break;
    //   case "shorttext":
    //     createDOM.shortText(element.label, element.name);
    //     break;
    //   case "number":
    //     createDOM.number(element.label, element.name);
    //     break;
    //   case "combo":
    //     createDOM.combo(element.label, element.name, element.variants);
    //     break;
    //   case "radio":
    //     createDOM.radio(element.label, element.name, element.variants);
    //     break;
    //   case "check":
    //     createDOM.check(element.label, element.name);
    //     break;
    //   case "memo":
    //     createDOM.memo(element.label, element.name);
    //     break;
    //   case "submit":
    //     createDOM.submit(element.label);
    //     break;
    // }

    createDOM[element.kind](element.label, element.name, element.variants);

  });

  return formDOM;
}
var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];
var formDOM__1 = createForm(formDef1);
var formDOM__2 = createForm(formDef2);
document.body.appendChild(formDOM__1);
document.body.appendChild(formDOM__2);