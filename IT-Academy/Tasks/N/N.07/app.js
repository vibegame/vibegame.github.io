function howManyVowels(str) {
    str = str.toLowerCase();
    function checkSpeedOfFunction(n, func, str) {
        let result = func();
        var time = performance.now();
        for(let i = 0;i<n;i++) {
            func();
        }
        time = performance.now() - time;
        return {Time: time, Result: result, Text: str};
    }
    function solution1() {
        let result = 0;
        let vowels = {
            "а": 0,
            "о": 0,
            "э": 0,
            "ы": 0,
            "и": 0,
            "у": 0,
            "я": 0,
            "ё": 0,
            "ю": 0,
            "е": 0,
        };
        for(let i = 0;i<str.length;i++) {
            if(str[i] in vowels)
                result++;
        }
        return result;  
    }
    function solution2() {
        let result = str.split("").filter(c => "аоиеёэыуюя".includes(c)).length;
        return result;
    }
    function solution3() {
        var result = str.match(/[аоиеёэыуюя]/g).length;
        return result;
    }
    function solution4() {
        var result = 0;
        for(var i = 0; i < str.length; i++){
            switch(str[i]) {
                case "а":result++;break;
                case "о":result++;break;
                case "э":result++;break;
                case "ы":result++;break;
                case "и":result++;break;
                case "у":result++;break;
                case "я":result++;break;
                case "ё":result++;break;
                case "ю":result++;break;
                case "е":result++;break;
            }
        }
        return result;
    }
    function solution5() {
        var result = 0;
        var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
        for (var i = 0; i < str.length; i++)
            for (var j = 0; j < vowels.length; j++)
                if (str[i] === vowels[j]) {
                    result++;
                    break;
                }
            return result;    
    }
    let analyzeResult = [],
        n = 200;
    analyzeResult.push(checkSpeedOfFunction(n, solution3, "Через регулярные выражения"));
    analyzeResult.push(checkSpeedOfFunction(n, solution4, "Через switch"));
    analyzeResult.push(checkSpeedOfFunction(n, solution2, "Через split->filter->includes->length"));
    analyzeResult.push(checkSpeedOfFunction(n, solution5, "Через массив гласных"));
    analyzeResult.push(checkSpeedOfFunction(n, solution1,"Через объект vowels"));
    return analyzeResult;
}
let str = prompt("Введите строку и мы узнаем, сколько гласных букв в ней:");
let letters = howManyVowels(str);
console.log(letters);