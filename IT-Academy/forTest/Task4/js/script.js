let text = prompt("Введите текст");

let words = [];

let top_words = ["","",""];

text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

words = text.split(" ");

words.sort(function (a, b) {
  if (a.length > b.length) {
    return -1;
  }
  if (a.length < b.length) {
    return 1;
  }
  return 0;
});

console.log(words);
alert(words[0]);
alert(words[1]);
alert(words[2]);