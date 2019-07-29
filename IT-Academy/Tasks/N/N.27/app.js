"use strict";
var submitButton = document.getElementById("submit");
var inputs = {
  developer: document.querySelector(`.form .form__developer input`),
  websiteName: document.querySelector(`.form .form__website-name input`),
  websiteURL: document.querySelector(`.form .form__website-url input`),
  startDate: document.querySelector(`.form .form__start-date input`),
  visitors: document.querySelector(`.form .form__visitors input`),
  email: document.querySelector(`.form .form__email input`)
};
function validateAll(method, item) {
  class Validate {
    constructor(value) {
      this.value = value.trim();
    }
    developer() {
      if (this.value.length < 2)
        return { state: false, message: "Слишком коротко" };
      else if (!/^[a-zA-Z0-9\s]+$/.test(this.value))
        return { state: false, message: "Недопустимые символы" };
      else return { state: true, message: "Хорошо" };
    }

    websiteName() {
      if (this.value.length < 4)
        return { state: false, message: "Слишком коротко" };
      else if (/\s/.test(this.value))
        return { state: false, message: "Нельзя использовать пробелы" };
      else if (!/^[a-zA-Z0-9]+$/.test(this.value))
        return { state: false, message: "Недопустимые символы" };
      else return { state: true, message: "Хорошо" };
    }

    websiteURL() {
      if (this.value.length < 3)
        return { state: false, message: "Слишком коротко" };
      else if (
        !/^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/.test(
          this.value
        )
      )
        return { state: false, message: "Неверный URL" };
      else return { state: true, message: "Хорошо" };
    }

    startDate() {
      function dateIsValidate(userValue) {
        let dt = new Date();

        var currentYear = dt.getFullYear();
        var currentMonth = dt.getMonth() + 1;
        var currentDay = dt.getDate();

        var regexp = /^\d{1,2}\.\d{1,2}\.\d{1,4}$/;
        if (regexp.test(userValue)) {
          var values = userValue.split(".");
          var d = values[0] - 0;
          var m = values[1] - 0;
          var y = values[2] - 0;

          var daysInMonth = 31;

          if (currentYear < y) return false;
          if (currentYear == y && currentMonth < m) return false;
          if (currentYear == y && currentMonth == m && currentDay < d)
            return false;

          if (m > 0 && m < 13 && y > 0 && y < 10000) {
            if (m == 2) {
              daysInMonth =
                y % 400 == 0 ? 29 : y % 100 == 0 ? 28 : y % 4 == 0 ? 29 : 28;
            } else if (m == 4 || m == 6 || m == 9 || m == 11) {
              daysInMonth = 30;
            }
            return d <= daysInMonth;
          }
        }
        return false;
      }
      if (!dateIsValidate(this.value))
        return { state: false, message: "Неверная дата. Пример: 21.02.2019" };
      else return { state: true, message: "Хорошо" };
    }
    visitors() {
      if (!this.value.length) return { state: false, message: "Поле пустое" };
      else if (!/^[0-9]+$/.test(this.value))
        return { state: false, message: "Только число" };
      else if (+this.value > 10 ** 9)
        return { state: false, message: "Слишком многовато" };
      else return { state: true, message: "Хорошо" };
    }
    email() {
      if (!this.value.length) return { state: false, message: "Поле пустое" };
      else if (
        !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          this.value
        )
      )
        return { state: false, message: "Недопустимые символы" };
      else return { state: true, message: "Хорошо" };
    }
  }
  function showMessage(item, state, text) {
    let spanState = document.createElement("span");
    let lastState = item.querySelector(".state-input");
    spanState.className =
      "state-input " + (state == "error" ? "error" : "success");
    spanState.innerHTML = text;
    if (lastState) {
      item.replaceChild(spanState, lastState);
      return;
    }
    item.appendChild(spanState);
  }
  let parent = item.parentNode;
  let validate = new Validate(item.value);
  let result = validate[method]();
  if (result.state) {
    showMessage(parent, "success", result.message);
  } else {
    showMessage(parent, "error", result.message);
  }
  return result.state;
}
for (let key in inputs) {
  inputs[key].addEventListener("change", function() {
    validateAll(key, this);
  });
}
submitButton.onclick = function() {
  let result = true;
  for (let key in inputs) {
    result *= validateAll(key, inputs[key]);
  }
  return Boolean(result);
};
