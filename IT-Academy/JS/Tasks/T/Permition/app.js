
Number.prototype.length = function() {

    let num = this,
        cnt = 0;

    while(num>0) {
        ++cnt;
        num = (num - (num%10))/10;
    }

    return cnt;
}

function numToArr(num) {
    let arr = [];
    for(let i=0;i<10;i++) {
        arr[i] = 0;
    }
    while(num>0) {
        ++arr[num%10];
        num = (num - (num%10))/10;
    }
    return arr;
}

function permition(num) {
    let arr = numToArr(num);
    rearrange(0, arr);
}

function isEmpty(arr) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i]) return false;
    }
    return true;
}

function rearrange(prefix, arr) {
    let used = [];
    if(isEmpty(arr)) {
        console.log(`%c${prefix}`, 'color: red;');
        return;
    }
    for(let i=0;i<10;i++) {
        used[i] = false;
    }

    for(let i=0;i<10;i++) {
        if(used[i] || !arr[i]) continue;
        used[i] = true;
        --arr[i];
        prefix = prefix*10+i;
        rearrange(prefix, arr);
        prefix = (prefix - (prefix%10))/10;
        ++arr[i];
    }
}

permition(599);
