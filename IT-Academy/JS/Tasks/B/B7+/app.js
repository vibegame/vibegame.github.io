String.prototype.reverse = function(str) {
    return this.split("").reverse().join("");
}
function formatNumber(num, formatter) {

    let new_str = ""; // Наша искомая строка
    formatter = formatter.reverse();
    num_str = String(num).reverse();
     // Ищем первые вхождения точек
    let dotFormatterIndex = formatter.indexOf("."),
        dotNumIndex       = num_str.indexOf(".");

    //Если точек нет, то начальный индекс будет равен начальной позиции
    if(dotFormatterIndex == -1) {
        dotFormatterIndex = 0;
    }
    if(dotNumIndex == -1) {
        dotNumIndex = 0;
    }
    //Находим разницу количеств цифр до точки в данном числе и данном форматере
    let diff = dotNumIndex - dotFormatterIndex;
    if(diff == 0) { // если равно, то просто вырезаем все цифры до точки включая
        new_str = num_str.substring(0, dotNumIndex+1);
    }
    else if(diff < 0){ // если меньше нуля, значит в форматере до запятой больше знаков, чем в данном числе
                        // Поэтому добавляем нули в начало массива командой padStart()
        new_str = num_str.substring(0, dotNumIndex+1);
        new_str = new_str.padStart(dotFormatterIndex+1, "0");
    } else {                                //  Если больше нуля, то в числе до точки больше цифр, чем в форматере
                                            // Поэтому округляем
        let tens = 10**dotFormatterIndex;
        num = Math.round(num*tens)/tens;
        num_str = String(num).reverse();
        dotNumIndex -= diff;
        new_str = num_str.substring(0, dotFormatterIndex+1);
    }
    // Здесь мы добавляем остальные числа, соблюдая пробелы в форматере.
    //Если форматор меньше, чем число, то форматор обрежет его
    //Если число меньше, чем форматор, то форматор добавит все цифры числа
    let k = dotNumIndex;
    for(let i = dotFormatterIndex+1;i<formatter.length;i++) {
        k++;
        if(!formatter[i] || !num_str[k]) // Если элементы вышли за границы массива, то выходим из цикла
            return new_str.reverse();
        if(formatter[i] == " ") { // Если пробел, то ставим его, и пропускаем ход
            new_str+=" ";
            k--;
            continue;
        }
        new_str += num_str[k];
    }
    return new_str.reverse();
}

let formatter = prompt("Введите форматер: ");
let str = prompt("Введите число: ");

console.log( formatNumber(Number(str), formatter) );