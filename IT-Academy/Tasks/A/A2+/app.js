var str = "     Hello     "; // сама строка
str = prompt("Введите желаемую строку:", str);
var target = " "; // цель поиска
function myTrim(str) {
    let pos = 0;
    while(str[pos] == target) {
        str = str.slice(1);
    }
    pos = str.length - 1;
    while(str[pos] == target) {
        str = str.slice(0, -1);
        pos--;
    }
    return str;
}
str = myTrim(str);
alert(str);