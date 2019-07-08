function deepCopy(obj) {
  if (null == obj || "object" != typeof obj) return obj;

  if (Array.isArray(obj)) {
    var copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (attr in obj) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }
  return copy;
}

let test = {num:10, numdrob:3.14, str:"Hello", array:[1,2,3], obj:{obj_num:40, obj_str:"Bye", obj_array:[4,5,6]}, test_nan:NaN, test_null:null, test_undefined:undefined, test_infinity: Infinity}
let copiedTest = deepCopy(test);
console.warn("---------Искомый объект----------");
console.log(test);
console.warn("-------Скопированынй объект------------");
console.log(copiedTest);
console.log("test.num == copiedTest.num возвращает " + (test.num == copiedTest.num));
console.log("test.numdrob == copiedTest.numdrob возвращает " + (test.numdrob == copiedTest.numdrob));
console.log("test.str == copiedTest.str возвращает " + (test.str == copiedTest.str));
console.log("test.array == copiedTest.array возвращает " + (test.array == copiedTest.array));
console.log("test.obj == copiedTest.obj возвращает " + (test.obj == copiedTest.obj));
console.log("test.obj.obj_num == copiedTest.obj.obj_num возвращает " + (test.obj.obj_num == copiedTest.obj.obj_num));
console.log("test.obj.obj_str == copiedTest.obj.obj_str возвращает " + (test.obj.obj_str == copiedTest.obj.obj_str));
console.log("test.obj.obj_array == copiedTest.obj.obj_array возвращает " + (test.obj.obj_array == copiedTest.obj.obj_array));
console.log("test.test_nan == copiedTest.test_nan возвращает " + (test.test_nan == copiedTest.test_nan));
console.log("test.test_null == copiedTest.test_null возвращает " + (test.test_null == copiedTest.test_null));
console.log("test.test_undefined == copiedTest.test_undefined возвращает " + (test.test_undefined == copiedTest.test_undefined));
console.log("test.test_infinity == copiedTest.test_infinity возвращает " + (test.test_infinity == copiedTest.test_infinity));
console.log("isNaN(copiedTest.test_nan) возвращает " + (isNaN(copiedTest.test_nan)));
