function treeSum(array) {
    let result = 0;
    for(let i = 0; i < array.length; i++) {
        if(Array.isArray(array[i]))
            result+=treeSum(array[i]);
        else
            result+=array[i];
    }
    return result;
}

let array = [5, 7, 
    [4, [2], 8, [1,3], 2], 
    [9, []],
    1, 8];

alert(treeSum(array));