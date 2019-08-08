let n = 1000; // how many
let p = 2; // min

function isPrime(num) {
	for( d=2; d*d <= num; d++){ 
		if(num % d == 0) 
			return false;
		}
	return true;
}

for(let i = p; i<=1000; i++) {
    if(isPrime(i))
        console.log(i);
}
