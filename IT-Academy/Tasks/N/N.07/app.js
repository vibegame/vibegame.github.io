function howManyVowels(str) {
    str = str.toLowerCase();
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
        if(!vowels[str[i]] == undefined)
            vowels[str[i]]++;
    }  
    return vowels;
}
let str = prompt("Введите строку и мы узнаем, сколько гласных букв в ней:");
let letters = howManyVowels(str);
console.log(letters);
