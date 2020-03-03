function solve(arr) {
    let result = [];
    return arr.forEach(el => {
        let command = el.split(' ')[0];
        let str = el.split(' ')[1];

        switch (command) {
            case 'add': result.push(str);
                break;
            case 'remove': result = result.filter(x => x !== str);
                break;
            case 'print': console.log(result);
                break;
        }
    });
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])