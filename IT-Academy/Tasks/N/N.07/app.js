function howManyVowels(str) {
    str = str.toLowerCase();
    let vowels = {
        "а": 1,
        "о": 1,
        "э": 1,
        "ы": 1,
        "и": 1,
        "у": 1,
        "я": 1,
        "ё": 1,
        "ю": 1,
        "е": 1,
    };
    for(let i = 0;i<str.length;i++) {
        if(vowels[str[i]])
            vowels[str[i]]++;
    }  
    return vowels;
}
let str = prompt("Введите строку и мы узнаем, сколько гласных букв в ней:");
let letters = howManyVowels(str);
for(let key in letters) {
    console.log(key + " - " + (letters[key]-1));
}