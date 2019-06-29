let user = {};

user.last_name = prompt("Ваша фамилия:");
user.first_name = prompt("Ваша имя:");
user.second_name = prompt("Ваше отчество:");
user.age = prompt("Ваш возраст:");
user.sex = confirm("Ваш пол - мужской?");

if((user.age > 62 && user.sex) || (user.age > 57 && !user.sex)) {
    user.retirement_age = "Да";
} 
else
    user.retirement_age = "Нет";

if(user.sex) {
    user.sex = "Мужской";
} else
    user.sex = "Женский";

user.days_age = +user.age*365;

alert("ФИО: " + user.last_name + " " + user.first_name + " " + user.second_name);
alert("Возраст, лет: " + user.age);
alert("Возраст, дней: " + user.days_age);
alert("Пол: " + user.sex);
alert("Пенсионный возраст: " + user.retirement_age);

