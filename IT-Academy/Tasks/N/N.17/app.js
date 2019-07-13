function howManyVowels(func, str) {
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
    str = str.toLowerCase();

    function solveThroughFilter() {
        function onlyVowels(v) {
            return (v in vowels);
        }
        return str.split('').filter(onlyVowels).length;
    }

    function solveThroughForEach() {
        let result = 0;
        function onlyVowels(v) {
            result += (v in vowels);
        }
        str.split('').forEach(onlyVowels);
        return result;
    }

    function solveThroughReduce() {
        function onlyVowels(r, v) {
            return r + (v in vowels); 
        }
        return str.split('').reduce(onlyVowels, 0);
    }
    switch(func) {
        case 'filter': return solveThroughFilter();
        case 'forEach': return solveThroughForEach();
        case 'reduce': return solveThroughReduce();
    }
}
let str = prompt("Введите строку");
console.log("Результат через forEach: " + howManyVowels("forEach", str));
console.log("Результат через filter: " + howManyVowels("filter", str));
console.log("Результат через reduce: " + howManyVowels("reduce", str));