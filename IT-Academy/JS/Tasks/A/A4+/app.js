let str = "   яъъбАН дИьт ТИДНА      Б Я    ";
str = prompt("Введите желаемую строку: ", str);
function checkPalindrom(str) {
    str = str.toLowerCase();
    str = str.replace(/[.,\/#!?$%ьъ\^&\*;:{}=\-_`~()\s]/g,"");
    str = str.replace(/ё/g,"е");
    function recurs(k) {
        if(k == Math.round(str.length/2)) {
            return true;
        }  
        if(str[k] == str[str.length-1-k]) {
            return recurs(k + 1);
        }
        else
            return false;
    }
    return recurs(0);
}
if(checkPalindrom(str)) {
    alert("Да");
} else
    alert("Нет");