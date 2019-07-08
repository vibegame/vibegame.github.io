function deepComp(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (obj1 == null || typeof obj1 != "object" ||
      obj2 == null || typeof obj2 != "object")
    return false;

  var prop1 = 0, prop2 = 0;

  for (var prop in obj1)
    prop1++;

  for (var prop in obj2) {
    prop2++;
    if(isNaN(obj1[prop]) && isNaN(obj2[prop]) && typeof(obj1[prop]) != 'object' && typeof(obj2[prop]) != 'object')
      continue;
    if (!(prop in obj1) || !deepComp(obj1[prop], obj2[prop])) {
      return false;
    }
      
  }
  return prop1 == prop2;
}
var H1={ a:5, b: { b1:6, b2:7 } };
var H2={ b: { b1:6, b2:7 }, a:5 };
var H3={ a:5, b: { b1:6 } };
var H4={ a:5, b: { b1:66, b2:7 } };
var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
var H6={ a:null, b:undefined, c:Number.NaN };
var H7={ c:Number.NaN, b:undefined, a:null };
var H8={a:5,b:6};
var H9={c:5,d:6};
var H10={a:5};
var A1=[5,7];
var A2=[5,5,7];
var A3=[5,8,7];
console.log("deepComp(H1,H2) = " + deepComp(H1,H2)); //будет true
console.log("deepComp(H1,H3) = " + deepComp(H1,H3)); //будет false
console.log("deepComp(H1,H4) = " + deepComp(H1,H4)); //будет false
console.log("deepComp(H1,H5) = " + deepComp(H1,H5)); //будет false
console.log("deepComp(H6,H7) = " + deepComp(H6,H7)); //будет true
console.log("deepComp(H8,H9) = " + deepComp(H8,H9)); //будет false
console.log("deepComp(H8,H10) = " + deepComp(H8,H10)); //будет false
console.log("deepComp(null,H10) = " + deepComp(null,H10)); //будет false
console.log("deepComp(H10,null) = " + deepComp(H10,null)); //будет false
console.log("deepComp(null,null) = " + deepComp(null,null)); //будет true
console.log("deepComp(null,undefined) = " + deepComp(null,undefined)); //будет false
console.log("deepComp(5,\"5\") = " + deepComp(5,"5")); //будет false
console.log("deepComp(5,H1) = " + deepComp(5,H1)); //будет false
console.log("deepComp(A1,H1) = " + deepComp(A1,H1)); //будет false
console.log("deepComp(A2,A3) = " + deepComp(A2,A3)); //будет false