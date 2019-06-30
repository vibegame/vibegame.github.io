let str = "   яъъбАН дИьт ТИДНА      Б Я    ";
str = prompt("Введите желаемую строку: ", str);
function checkPalindrom(str) {
    str = str.toLowerCase();
    str = str.replace(/[.,\/#!?$%ьъ\^&\*;:{}=\-_`~()\s]/g,"");
    str = str.replace(/ё/g,"е");
    let s = 0, e = str.length-1;
    for(let i = 0;i<e;i++) {
        console.log(str[i] + "  " + str[e]);
        if(str[i] != str[e])
            return false;
        e--;
    }
    return true;
}
if(checkPalindrom(str))
    alert("Да");
else
    alert("Нет");