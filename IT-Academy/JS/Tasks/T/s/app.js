let arr = [1,2,3,4,5,6];

let reverse = (arr) => {
    let buf;
    for(let i=0;i<arr.length / 2;i++) {
        console.log(arr[i], arr[arr.length - i - 1]);
        buf = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = buf;
    }
    
}

reverse(arr);
console.log(arr);