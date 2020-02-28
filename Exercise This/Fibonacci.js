function memFib(){
    function fib(n){
        if (n<=1) {
            return 1;
        }
        return fib(n-2)+fib(n-1);
    }

    let counter=0;
    return function inner(){
        let result=fib(counter)
        counter++;
        return result;
    }
}

let fib = memFib();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
