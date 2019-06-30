var str = "            S    Hello     E              "; // сама строка
str = prompt("Введите желаемую строку:", str);
var target = " "; // цель поиска
function myTrim(str) {
    let pos = 0;
    while(str[pos] == target) {
        pos++;
    }
    str = str.slice(pos);
    pos = str.length - 1;
    while(str[pos] == target) {
        pos--;
    }
    str = str.slice(0, pos+1);
    return str;
}
str = myTrim(str);
console.log(str);