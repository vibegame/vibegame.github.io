console.log(10**20);
let arr = [1, 2, NaN];
let obj = {red: "#f00", black:"#000", green: "#00f"};
console.log(arr.includes(NaN));
console.log(Object.entries(obj));

Object.entries(obj).map(([name, color]) => {console.log(`${name.padEnd(20, '-')} Count: ${color.padStart(5, '|')}`);});