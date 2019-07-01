let str = "   яъъбАН дИьт ТИДНА      Б Я    ";
str = prompt("Введите желаемую строку: ", str);
function checkPalindrom(str) {
    str = str.toLowerCase();
    str = str.replace(/[.,\/#!?$%ьъ\^&\*;:{}=\-_`~()\s]/g,"");
    str = str.replace(/ё/g,"е");
    function recurs(str, k) {
        if(k == Math.round(str.length/2)) {
            return true;
        }  
        if(str[k] == str[str.length-1-k]) {
            return recurs(str, k + 1);
        }
        else
            return false;
    }
    return recurs(str, 0);
}
console.log(checkPalindrom(str));