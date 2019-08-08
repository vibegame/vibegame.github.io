let year = prompt("Введите год:", "2019");
function defineCentury(year) {
    return Math.floor((+year-1)/100 + 1);
}
let century = defineCentury(year);
alert(century);
