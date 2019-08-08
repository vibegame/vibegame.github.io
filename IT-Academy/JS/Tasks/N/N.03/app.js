let user = {
    lastName: false,
    firstName: false,
    patronymic: false,
    age: -1,
    sex: undefined
};

function checkName(name) {
    let result;
    while(!result) {
        result = prompt(name);
    }
    return result;
}
function checkAge() {
    let result;
    while(result > 120 || !result || !isFinite(result)) {
        result = +prompt("Ваш возраст:");
    }
    return result;
}
function checkSex(sex) {
    if(sex)
        return "Мужской";
    else 
        return "Женский";
}
function checkPension(forMale, forFemale, age, sex) {

    if(sex) {
        if(age>=forMale) {
            return "Да";
        } else
            return "Нет";
    } else {
        if(age>=forFemale) {
            return "Да";
        } else
            return "Нет";        
    }
    
}
user.lastName = checkName("Ваша фамилия:");
user.firstName = checkName("Ваше имя:");
user.patronymic = checkName("Ваше отчество:");
user.age = checkAge();
user.sex = confirm("Ваш пол - мужской?");


alert(`Ваше ФИО: ${user.lastName} ${user.firstName} ${user.patronymic}
Ваш возраст в годах: ${user.age}
Ваш возраст в днях: ${user.age*365}
Через 5 лет вам будет: ${user.age+5}
Ваш пол: ${checkSex(user.sex)}
Вы на пенсии: ${checkPension(63, 58, user.age, user.sex)}`
);