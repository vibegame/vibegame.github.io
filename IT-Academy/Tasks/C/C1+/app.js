function getDays(month, year) {
  function transpMonth() {
    let months = {
      1: "January",
      2: "February",
      3: "March", 
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    };
    return months[month];
  }
  function getDays_2()
  {
    let date = new Date(year, month);
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  }
  function getDays_1() {
    let months = {
      1: 31,
      2: [28, 29],
      3:31, 
      4:30,
      5:31,
      6:30,
      7:31,
      8:31,
      9:30,
      10:31,
      11:30,
      12:31
    };
    let days = 0;
    if(month == 2) {
      if(year%4) {
          days = months[2][0];
          return days;
      }
      else {
        if(year%100 && !(year%400)) {
          days = months[2][0];
          return days;
        }
        days = months[2][1];
        return days;
      } 
    }
    days = months[month];
    return days;
  }
  return {
    "Через объект и IF": getDays_1(),
    "Через класс Date": getDays_2(),
    "Месяц": transpMonth() 
  };
}
let month = +prompt("Введите номер месяца(1 - 12)");
let year = +prompt("Введите номер года");
console.log(getDays(month, year));    