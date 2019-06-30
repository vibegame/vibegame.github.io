let str = "   яъъбАН дИьт ТИДНА      Б Я    ";
str = prompt("Введите желаемую строку: ", str);
function checkPalindrom(str) {
    str = str.toLowerCase();
    str = str.replace(/[.,\/#!?$%ьъ\^&\*;:{}=\-_`~()\s]/g,"");
    str = str.replace(/ё/g,"е");
    return str == str.split('').reverse().join('');
}
if(checkPalindrom(str))
    alert("Да");
else
    alert("Нет");