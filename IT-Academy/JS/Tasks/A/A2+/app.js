var str = "            S    Hello     E              ";
str = prompt("Введите желаемую строку:", str);
function myTrim(str) {
    let posA = 0,
        posB = str.length - 1;
    while(str[posA] == " ") {
        posA++;
    }

    if(posA == posB) { // если найдены только пробелы
        str = "";
        return str; 
    }

    while(str[posB] == " ") { 
        posB--;
    }

    if(posA == 0 && posB == str.length - 1) // если пробелов не найдено
        return str;

    str = str.slice(posA, posB+1);
        return str;
}
str = myTrim(str);
console.log(str);
