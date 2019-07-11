// == Promises version ==
function multiply(a, b) {
    return new Promise(function (resolve) {
    resolve(a * b);
    });
   }
   function foo() {
    return new Promise(resolve => resolve(multiply(2, 5)))
        .then(result => result);
}
   // Errors will be swallowed here
   new Promise(function() {
    foo().then(result => console.log(result));
   });