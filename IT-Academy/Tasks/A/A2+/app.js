var str = "            S    Hello     E              "; // сама строка
str = prompt("Введите желаемую строку:", str);
function myTrim(str) {
    let posA = 0,
        posB = str.length - 1;
    while(str[posA] == " ") {
        posA++;
    }
    while(str[posB] == " ") {
        posB--;
    }
    str = str.slice(posA, posB+1);
    return str;
}
str = myTrim(str);
console.log(str);
