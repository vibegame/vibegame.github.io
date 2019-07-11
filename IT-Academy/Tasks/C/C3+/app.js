function deepComp(obj1, obj2) {
  
  let type1 = typeof(obj1);
  let type2 = typeof(obj2);

  if (type1 != type2) // Не подходят по типу
    return false;

  if (obj1 === obj2) // Если есть равные, то возвращаем true
    return true;

  if (type1 != "object" && type2 != "object") { // Всё, что не объект, проверяем на NaN или на равенство
    if (Number.isNaN(obj1) && Number.isNaN(obj2))
      return true;
    return false;
  }
  let obj1IsArray = Array.isArray(obj1);
  let obj2IsArray = Array.isArray(obj2);

  if (obj1IsArray && obj2IsArray) { // Здесь работаем только с массивами
    if (obj1.length != obj2.length)
      return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!deepComp(obj1[i], obj2[i]))
        return false;
    }
    return true;
  }
  // Здесь остались только объекты, но среди них могут быть одиночки-null, Array.
  if (obj1IsArray || obj2IsArray || obj1 === null || obj2 === null)
    return false;

  /*
  Здесь мы отсеили абсолютно всё, кроме объектов.
  */

  if (Object.keys(obj1).length != Object.keys(obj2).length) // если элементов в одном объекте меньше, чем в другом, значит они уже не могут быть равны
    return false;

  for (let key in obj1) { // Если ключа нет в другом объекте, возвращаем false. Если есть, то проверяем на равенство.
    if (!(key in obj2) || !deepComp(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

var H1 = { a: 5, b: { b1: 6, b2: 7 } };
var H2 = { b: { b1: 6, b2: 7 }, a: 5 };
var H3 = { a: 5, b: { b1: 6 } };
var H4 = { a: 5, b: { b1: 66, b2: 7 } };
var H5 = { a: 5, b: { b1: 6, b2: 7, b3: 8 } };
var H6 = { a: null, b: undefined, c: Number.NaN };
var H7 = { c: Number.NaN, b: undefined, a: null };
var H8 = { a: 5, b: 6 };
var H9 = { c: 5, d: 6 };
var H10 = { a: 5 };
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];
console.log("deepComp(H1,H2) = " + deepComp(H1, H2)); //будет true
console.error("deepComp(H1,H3) = " + deepComp(H1, H3)); //будет false
console.error("deepComp(H1,H4) = " + deepComp(H1, H4)); //будет false
console.error("deepComp(H1,H5) = " + deepComp(H1,H5)); //будет false
console.log("deepComp(H6,H7) = " + deepComp(H6,H7)); //будет true
console.error("deepComp(H8,H9) = " + deepComp(H8,H9)); //будет false
console.error("deepComp(H8,H10) = " + deepComp(H8,H10)); //будет false
console.error("deepComp(null,H10) = " + deepComp(null,H10)); //будет false
console.error("deepComp(H10,null) = " + deepComp(H10,null)); //будет false
console.log("deepComp(null,null) = " + deepComp(null,null)); //будет true
console.error("deepComp(null,undefined) = " + deepComp(null,undefined)); //будет false
console.error("deepComp(5,\"5\") = " + deepComp(5,"5")); //будет false
console.error("deepComp(5,H1) = " + deepComp(5,H1)); //будет false
console.error("deepComp(A1,H1) = " + deepComp(A1,H1)); //будет false
console.error("deepComp(A2,A3) = " + deepComp(A2,A3)); //будет false
console.error("deepComp( [5,7], {0:5,1:7} ) =  " + deepComp( [5,7], {0:5,1:7} ) );